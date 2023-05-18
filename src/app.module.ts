import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './modules/url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './modules/url/url.entity';
import { ConfigModule } from '@nestjs/config';
import { HitModule } from './modules/hit/hit.module';
import { Hit } from './modules/hit/hit.entity';
import { ConnectionOptions } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {

        const connectionOptions: ConnectionOptions = {
          type: 'sqlite',
          database: 'Shorten.sqlite',
          entities: [ Url, Hit, User ],
          migrations: [__dirname + '/migrations/*{.ts, .js}'],
          migrationsTableName: "migrations_typeorm",
          migrationsRun: true,
          synchronize: true,
        };
        return connectionOptions
      }
    }),
    ConfigModule.forRoot(),
    UrlModule,
    HitModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
