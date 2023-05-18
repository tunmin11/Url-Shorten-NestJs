import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (
        private service: UserService
    ){}

    @Post('signup')
    async SignUpUser(
        @Body()
        user: UserDto
    ) {
        let { username, password } = user;
        let hashPassword = await this.service.hashPassword(password);
        let newUser = await this.service.createUser(username, hashPassword);
        return newUser; 
    }
}
