import { BadRequestException, NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { UrlController } from './url.controller';
import { ShortenUrlTdo } from './url.dto';
import { Url } from './url.entity';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;
  let controller: UrlController;

  const ENDPOINT = 'http://localhost:3003'
  const shortCode = nanoid(10);
  const mockUrl: ShortenUrlTdo = {
      longUrl: 'www.google.com',
      expiry: '2023-05-20'
  }

  const InvalidMockData: ShortenUrlTdo = {
    longUrl: 'abcdefghi',
    expiry: '2023-05-20'
  }

  const blackListedMockData: ShortenUrlTdo = {
    longUrl: 'www.abc.com',
    expiry: '2023-05-20'
  }

  const isBlackListUrl = (url : string): boolean => {
    let blacklistRegex = /www\.(abc|bcd|efg)\.com/;
    return blacklistRegex.test(url);
  }

  beforeEach(async () => {
    
    const ApiServiceProvider = {
      provide: UrlService,
      useFactory: () => ({
        shortenUrl: jest.fn( (url: ShortenUrlTdo) => {
          if(!isURL(url.longUrl)) throw new BadRequestException("String must be a valid URL.");
          if(isBlackListUrl(url.longUrl)) throw new NotAcceptableException(`${url.longUrl} is blacklisted in this system.`);
          return `${ENDPOINT}/url/${shortCode}`;
        })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService, ApiServiceProvider],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('Shorten', () => {
      it('should shorten the URL and return the shortened URL', async () => {
        let url = await controller.shorten(mockUrl);
        console.log({ url })
        expect(service.shortenUrl).toHaveBeenCalled();
      });

      it('should shorten the URL is invalid, throw for invalid request body', async () => {
        // controller.shorten(InvalidMockData);
        expect.assertions(1);
        try {
          let url = await service.shortenUrl(InvalidMockData)
        } catch (error) {
          expect(error.getStatus()).toBe(400);
        }
      });

      it('should shorten the URL is blackListed, excepted status : 406', async () => {
        // controller.shorten(InvalidMockData);
        expect.assertions(1);
        try {
          let url = await service.shortenUrl(blackListedMockData)
          console.log({url})
        } catch (error) {
          expect(error.getStatus()).toBe(406);
        }
      });


    });



});
