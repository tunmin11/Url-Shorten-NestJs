import { BadRequestException, NotAcceptableException , GoneException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm'
import { ShortenUrlTdo } from './url.dto';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { HitService } from '../hit/hit.service';
import { UserService } from '../user/user.service';
import * as moment from 'moment';

@Injectable()
export class UrlService {
    private readonly blacklistRegex: RegExp;

    constructor(
        @InjectRepository(Url)
        private urlRepo: Repository<Url>,

        @Inject(HitService)
        private hitService: HitService,

        @Inject(UserService)
        private userService: UserService
        
    ) {
        // Define regex pattern for blacklisted URLs
        this.blacklistRegex = /www\.(abc|bcd|efg)\.com/;
    }

    // Get All Urls
    async all() {
        let urls = await this.urlRepo.find({
            select: {
                shortUrlCode : true,
                longUrl : true,
                expiry : true,
                isActive : true
            },
            relations : {
                hits: true
            }
        });

        urls = urls.map( url => ({ ...url, hitCount : url.hits.length }))

        return urls;
    }

    // Searching Url with Keyword and ShortCode
    async searchUrlsByKeywordAndShortCode(keyword: string, shortCode: string): Promise<Url[]> {
        const options: FindOptionsWhere<Url> = {
            
        };
    
        if (keyword) {
          options.longUrl = Like(`%${keyword}%`);
        }
    
        if (shortCode) {
          options.shortUrlCode = shortCode;
        }
    
        return this.urlRepo.findBy(options);
    }

    // DeActive Url By Id 
    async deleteUrl(id: number): Promise<Url> {
        const url = await this.urlRepo.findOneBy({ id });

        if (!url) {
          throw new BadRequestException('URL not found');
        }
    
        url.isActive = false;
    
        return this.urlRepo.save(url);
    }
    
    // Shorten the Given Url
    public async shortenUrl( url : ShortenUrlTdo) {
        const { longUrl, expiry }  = url;

        // Throw Error on Invalid Url input
        if (!isURL( longUrl )) { 
            throw new BadRequestException("String must be a valid URL.");
        }

        if(this.isBlackListUrl(longUrl)){
            throw new NotAcceptableException(`${longUrl} is blacklisted in this system.`)
        }

        const shortUrlCode = nanoid(10);

        try {
            let newUrl = this.urlRepo.create({ 
                shortUrlCode,
                longUrl,
                expiry: this.formatExpiryDateTime(expiry),
                isActive : true
            });
    
            console.log({ url })
            
            newUrl = await this.urlRepo.save(newUrl);
            
            return `${process.env.ENDPOINT}/url/${newUrl.shortUrlCode}`;

        } catch (error) {
            throw new UnprocessableEntityException('Something went wrong');
        }

    }

    async hit (url:  Url, ip : string ) {
        const hit = await this.hitService.hit( url , ip );
    }

    async redirect( shortUrlCode : string, ip : string ) {

        const url = await this.urlRepo.findOneBy({ shortUrlCode });

        if(!url) {
            throw new NotFoundException('Url not found')
        }

        const currentDate = moment();
        const urlExpiry = moment(url.expiry);

        console.log(currentDate, urlExpiry)
        if(urlExpiry.isAfter(currentDate)) {
            console.log('date expired')
            await this.expireUrl(url.id);
            throw new GoneException('Url is expired');
        }


        if(!url.isActive) {
            throw new GoneException('Url is expired');
        }

        if ( url ) {
            this.hit(url, ip);
            return url
        };
    }

    public isBlackListUrl( url: string ): boolean {
        return this.blacklistRegex.test(url);
    }

    private async expireUrl( id: number): Promise<void> {
        const url = await this.urlRepo.findOneBy({id});
        if (url) {
            url.isActive = false;
            await this.urlRepo.save(url);
        } else {
            throw new NotFoundException('URL not found');
        }
    }

    formatExpiryDateTime(isoString: string): string {
        let formatDate = moment(new Date(isoString)).endOf('day').toISOString();
        return formatDate;
    }

}
