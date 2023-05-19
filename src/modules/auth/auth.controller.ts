import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'


@Controller('auth')
export class AuthController {

    constructor (
        private authService: AuthService
    ){}
    
    @ApiOperation({ summary: 'User Sign In' })
    @ApiResponse({ status: 200, description: 'Successful login' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: UserDto })
    @Public()
    @Post('login')
    signIn(
        @Body()
        signUser: UserDto
    ) {
        return this.authService.signIn( signUser.username, signUser.password ) 
    }


}
