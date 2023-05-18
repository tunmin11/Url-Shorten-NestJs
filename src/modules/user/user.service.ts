import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private repo: Repository<User>
    ) {}

    async findOne ( username: string ) : Promise<User> {
        try {
            let user = await this.repo.findOneBy({ username });
            return user;
        } catch (error) {
            throw NotFoundException;
        }
    }


    async createUser ( username: string, password: string) : Promise<User> {
        let user = this.repo.create({
            username, password
        })
    
        user = await this.repo.save(user);

        return user;
    }

    async hashPassword ( password: string ): Promise<string>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        
        return hash;
    } 

}
