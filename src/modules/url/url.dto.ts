import { IsString, IsEmpty, IsDate } from "class-validator";

export class ShortenUrlTdo {

    @IsString()
    @IsEmpty()
    longUrl : string; 

    @IsDate()
    @IsEmpty()
    expiry : Date;

}