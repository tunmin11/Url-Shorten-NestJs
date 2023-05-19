import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
    constructor (
        private service: UserService
    ){}
    
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'Register successfully',
        type: UserDto,
    })
    @ApiResponse({
        status: 409,
        description: 'Email already register',
        type: UserDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Username must be an email',
        type: UserDto,
    })
    @Public()
    @Post('signup')
    async SignUpUser(
        @Body()
        user: UserDto
    ) {

        try {
            let { username, password } = user;
            let hashPassword = await this.service.hashPassword(password);
            let newUser = await this.service.createUser(username, hashPassword);
            return { message: "Register Successfully"}; 
        } catch (error) {
            throw error;
        }
    }
}
