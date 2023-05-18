import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hit } from './hit.entity';
import { HitService } from './hit.service';

@Module({
  imports : [TypeOrmModule.forFeature([ Hit ])],
  providers: [HitService],
  exports: [HitService]
})

export class HitModule {}
