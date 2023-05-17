import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Repository } from 'typeorm'
import { ShortenUrlTdo } from './url.dto';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private repo: Repository<Url>
    ) {}

    async all() {
        const urls = await this.repo.find({});
        return urls;
    }
    
    async shortenUrl( url : ShortenUrlTdo ) {
        const { longUrl, expiry }  = url;

        // Throw Error on Invalid Url input
        if (!isURL( longUrl )) { 
            throw new BadRequestException("String must be a valid URL.");
        }

        const shortUrlCode = nanoid(10);
        try {

            const url = this.repo.create({ 
                shortUrlCode,
                longUrl,
                expiry,
                hit: 0
            });

            this.repo.save(url);
            return `${process.env.ENDPOINT}/url/${url.shortUrlCode}`;

        } catch (error) {
            console.log({ ErrorOnShortenUrl : error });
            throw new UnprocessableEntityException('Server Error');
        }

    }

    async hit (url:  Url) {
        let updateUrl = await this.repo.update( url.id, {
            hit: url.hit + 1 || 0
        })
    }

    async redirect( shortUrlCode : string ) {
        try {
            const url = await this.repo.findOneBy({ shortUrlCode });
            if ( url ) { 
                this.hit(url);
                return url
            };
        } catch (error) {
            console.log({ ErrorOnRedirect : error });
            throw new NotFoundException('Resouce not found!');
        }
    }

}
