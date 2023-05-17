import { IsString, IsNotEmpty, IsDate, IsDateString } from "class-validator";

export class ShortenUrlTdo {

    @IsString()
    @IsNotEmpty()
    longUrl : string; 

    @IsDateString()
    @IsNotEmpty()
    expiry : string;

}