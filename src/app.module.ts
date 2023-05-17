import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './modules/url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './modules/url/url.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'Shorten.sqlite',
      entities: [ Url ],
      synchronize: true
    }),
    ConfigModule.forRoot(),
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
