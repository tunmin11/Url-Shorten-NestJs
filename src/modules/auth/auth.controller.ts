import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor (
        private authService: AuthService
    ){}
        
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(
        @Body()
        signUser: UserDto
    ) {
        return this.authService.signIn( signUser.username, signUser.password ) 
    }

    @Get('profile')
    getProfile(
        
    ){ 
        return "req"
    }

}
