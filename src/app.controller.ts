import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

export class claimTokensDTO{
  address: string;
  numberTokens: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @Get('token-address') 
    getTokenAddress(){
      return this.appService.getTokenAddress();
    }
  @Post('claim-tokens')
  claimTokens(@Body() body: claimTokensDTO) {
    return this.appService.claimTokens(body.address, body.numberTokens);
  }
}
