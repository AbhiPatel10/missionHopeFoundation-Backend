import { Controller, Post, Get, Body, Query, Res } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { Response } from 'express';

@Controller('phonepe')
export class PhonepeController {
  constructor(private readonly phonepeService: PhonepeService) {}

  @Post('initiate')
  async initiatePayment(
    @Body() body: { transactionId: string; amount: number; redirectUrl: string },
    @Res() res: Response
  ) {
    const result = await this.phonepeService.createPaymentTransaction(body);
    console.log("result", result);

    if(result.success){
      res.redirect(result.redirectUrl)
    }else {
      return{
        status: 400,
        message: "Something went wrong."
      }
    }

    return result
  }

  @Get('status')
  getStatus(@Query('transactionId') transactionId: string) {
    return this.phonepeService.checkPaymentStatus(transactionId);
  }
}
