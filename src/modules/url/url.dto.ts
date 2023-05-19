import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, IsNotEmpty, IsDate, IsDateString, IsUrl } from "class-validator";

export class ShortenUrlTdo {

    @ApiProperty({
        type: String,
        description: 'Origin Url to redirect when user hit Shorurl',
        example: 'https://www.disys.com/locations/bangkok-thailand/'
    })
    @IsUrl()
    @IsString()
    @IsNotEmpty()
    longUrl : string;

    @ApiProperty({
        type: String,
        description: 'Expiry for shorten URL.',
        example: '2023-05-23'
    })
    @IsDateString()
    @IsNotEmpty()
    expiry : string;

}