import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
