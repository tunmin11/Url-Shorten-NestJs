import { Controller, Body, Post, Get, Param, Res, Ip } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlTdo } from './url.dto';

@Controller('url')
export class UrlController {
    constructor (
        private service: UrlService
    ) {}

    @Get('')
    get() {
        return this.service.all();
    }

    @Post('shorten')
    shorten(
        @Body()
        url: ShortenUrlTdo
    ){
        return this.service.shortenUrl(url);
    }

    @Get(':code')
    async redirect(
        @Res() res,
        @Param('code')
        code : string,
        @Ip()
        ip : string
    ){
        const url = await this.service.redirect(code, ip);
        return res.redirect(url.longUrl);
    }

}
