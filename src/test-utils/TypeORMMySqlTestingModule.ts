import { TypeOrmModule } from '@nestjs/typeorm';
import { Hit } from 'src/modules/hit/hit.entity';
import { Url } from 'src/modules/url/url.entity';
import { User } from 'src/modules/user/user.entity';
import { ConnectionOptions } from 'typeorm';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
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
  });