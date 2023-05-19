import { ApiProperty, ApiResponse } from "@nestjs/swagger/dist";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        type: String, 
        description: 'Email of the user',
        example: 'shortenuser@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty({
        type: String,
        description: 'Password of the user',
        example: 'password123'
    })
    @IsNotEmpty()
    @IsString()
    password: string; 
}
