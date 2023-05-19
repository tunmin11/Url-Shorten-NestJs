import { Module } from '@nestjs/common';
import { UrlModule } from '../url/url.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [UrlModule],
  providers: [],
  controllers: [AdminController]
})
export class AdminModule {}
