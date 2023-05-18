import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(
        @Body()
        signUser: UserDto
    ) {
        return this.authService.signIn( signUser.username, signUser.password ) 
    }

}
