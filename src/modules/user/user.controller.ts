import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor (
        private service: UserService
    ){}
    
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
            return newUser; 
        } catch (error) {
            throw error
        }
    }
}
