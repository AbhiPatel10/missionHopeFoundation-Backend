import { Controller, Post, Get, Body, Query, Res, Param } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { Response } from 'express';

@Controller('phonepe')
export class PhonepeController {
  constructor(private readonly phonepeService: PhonepeService) { }

  @Post('initiate')
  async initiatePayment(
    @Body() body: { transactionId: string; amount: number; redirectUrl: string },
    @Res() res: Response
  ) {
    const result = await this.phonepeService.createPaymentTransaction(body);
    console.log("result", result);

    if (result.success) {
    
      return res.status(200).json({
        status: 200,
        message: "Redirecting to PhonePe...",
        redirectUrl: result.redirectUrl,
      });
    } else {
      return {
        status: 400,
        message: "Something went wrong."
      }
    }
  }

  @Get('status/:transactionId')
  getStatus(@Param('transactionId') transactionId: string) {
    console.log("transactionId", transactionId);
    return this.phonepeService.checkPaymentStatus(transactionId);
  }
}
