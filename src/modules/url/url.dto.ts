import { IsString, IsNotEmpty, IsDate } from "class-validator";

export class ShortenUrlTdo {

    @IsString()
    @IsNotEmpty()
    longUrl : string; 

    @IsString()
    @IsNotEmpty()
    expiry : string;

}