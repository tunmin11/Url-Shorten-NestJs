import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {}
