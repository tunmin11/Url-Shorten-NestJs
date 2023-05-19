import { Controller, Get, Inject, Query, NotFoundException } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { Url } from '../url/url.entity';
import { UrlService } from '../url/url.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('admin')
export class AdminController {
    constructor(
        private urlService: UrlService,
    ){}
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all URLs' })
    @ApiResponse({ status: 200, description: 'URLs retrieved successfully' })
    @Get('/urls')
    async getAllUrls(){
       let urls = await this.urlService.all();
       return urls;
    }

    // Filter URL by ShortCode and keyword
    @ApiBearerAuth()
    @ApiOperation({ summary: ' Filter URL by shortcode and keyword' })
    @ApiResponse({ status: 200, description: 'URLs filtered successfully' })
    @Get('/url/search')
    async searchUrls(@Query('keyword') keyword: string, @Query('shortcode') shortcode: string) {
      const urls = await this.urlService.searchUrlsByKeywordAndShortCode(keyword, shortcode);
      return urls;
    }

    @ApiOperation({ summary: 'Delete URL by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'URL ID' })
    @ApiResponse({ status: 200, description: 'URL deleted successfully' })
    @ApiResponse({ status: 404, description: 'URL not found' })
    @ApiBearerAuth()
    @Delete('/url/:id')
    async deleteUrl(@Param('id') id: number) {
        try {
            const deletedUrl = await this.urlService.deleteUrl(id);
            return { message: 'URL deleted successfully', data: deletedUrl };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('URL not found');
            }
            throw error;
        }
    }
}
