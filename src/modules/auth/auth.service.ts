import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    // User SignIn service
    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUserName(username);

        // If Password is not Matching 
        let isMatch = await this.isMatchPassword( pass, user?.password ); 
        if (!isMatch) {
          throw new UnauthorizedException();
        }

        // JWT Payload
        const tokenPayload = { username: user.username, sub: user.id };

        return {
            access_token : this.jwtService.sign(tokenPayload)
        };
    }

    // Check Password and Hash Password is Match 
    async isMatchPassword( password: string, hash: string ) {
        
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch; 

    }
}
