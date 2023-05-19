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
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({

      //Database Setup
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

    ThrottlerModule.forRoot({
      ttl: 6,
      limit: 15,
    }),
    ConfigModule.forRoot(),
    UrlModule,
    HitModule,
    UserModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})

export class AppModule {}
