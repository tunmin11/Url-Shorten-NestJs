import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, IsNotEmpty, IsDate, IsDateString } from "class-validator";

export class ShortenUrlTdo {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    longUrl : string; 

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    expiry : string;

}