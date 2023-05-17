import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Repository } from 'typeorm'
import { ShortenUrlTdo } from './url.dto';
import { IsUrl } from 'class-validator';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private repo: Repository<Url>
    ) {}
    
    async shortenUrl( url : ShortenUrlTdo ) {
        const { longUrl, expiry }  = url;

        // Throw Error on Invalid Url input
        if (!IsUrl( longUrl )) { 
            throw new BadRequestException("String must be a valid URL.");
        }

        const shortUrlCode = nanoid(10);
        try {

            const url = this.repo.create({ 
                shortUrlCode,
                longUrl,
                expiry
            });

            this.repo.save(url);
            return url.shortUrlCode;

        } catch (error) {
            console.log({ ErrorOnShortenUrl : error });
            throw new UnprocessableEntityException('Server Error');
        }

    }

    async redirect( shortUrlCode : string ) {
        try {
            const url = await this.repo.findOneBy({ shortUrlCode });
            if ( url ) return url;
        } catch (error) {
            console.log({ ErrorOnRedirect : error });
            throw new NotFoundException('Resouce not found!');
        }
    }

}
