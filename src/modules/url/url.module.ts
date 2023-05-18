import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { HitModule } from '../hit/hit.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Url ]), HitModule],
  providers: [UrlService],
  controllers: [UrlController]
})

export class UrlModule {}
