import { Controller, Body, Post, Get, Param, Res, Ip, Req, GoneException, NotAcceptableException } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlTdo } from './url.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'


@Controller('url')
export class UrlController {
    constructor (
        private service: UrlService
    ) {}

    // Generate Shorten URL 
    @ApiOperation({ summary: 'Shorten URL' })
    @ApiResponse({ status: 200, description: 'Shortened URL generated successfully' })
    @ApiResponse({ status: 406, description: 'URL is blacklisted' })
    @ApiResponse({ status: 404, description: 'Invalid request body' })
    @Public()
    @Post('shorten')
    async shorten(
        @Body()
        url: ShortenUrlTdo
    ) : Promise<string> {
        try {
            let shortenUrl = await this.service.shortenUrl(url); 
            return shortenUrl;
        } catch (error) {
            if(error instanceof NotAcceptableException) {
                throw new NotAcceptableException(`${url.longUrl} is blacklisted in this system.`)
            }
            throw error;
        }
    }

    // Shorten URL redirect route to LongURl
    @ApiOperation({ summary: 'Redirect Url to Origin Url' })
    @ApiResponse({ status: 200, description: 'Redire to the origin Url.' })
    @ApiResponse({ status: 410, description: 'Url is expired' })
    @ApiResponse({ status: 404, description: 'Url not found' })
    @Public()
    @Get(':code')
    async redirect(
        @Res() res,
        @Param('code') code : string,
        @Ip() ip : string
    ){
        try {
            const url = await this.service.redirect(code, ip);
            return res.redirect(url.longUrl);
        } catch (error) {
            if (error instanceof GoneException) {
                throw new GoneException('URL is expired');
            }
            throw error;
        }
    }

}
