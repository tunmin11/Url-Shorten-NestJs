import { ApiProperty } from "@nestjs/swagger/dist";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string; 
}