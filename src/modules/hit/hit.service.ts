import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from '../url/url.entity';
import { Hit } from './hit.entity';

@Injectable()
export class HitService {

    constructor(
        @InjectRepository(Hit)
        private repo : Repository<Hit>
    ) {}

    async hit ( url : Url, ip : string ) {
        let hit = this.repo.create({
            url,
            ip
        })

        hit = await this.repo.save(hit)
        return hit;
    }
}
