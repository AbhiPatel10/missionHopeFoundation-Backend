import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PhonepeService {
    private readonly MERCHANT_ID = 'ATMOSTUAT';
    //   private readonly saltKey = 'YOUR_SALT_KEY';
    //   private readonly saltKey = 'YOUR_SALT_KEY';
    private readonly saltIndex = 1;
    private readonly MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
    private readonly baseUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    async createPaymentTransaction(body: any) {
        try {

            const merchantTransactionId = body.transactionId;
            const data = {
                merchantId: this.MERCHANT_ID,
                merchantTransactionId: merchantTransactionId,
                merchantUserId: body.MUID,
                name: body.name,
                amount: body.amount * 100,
                redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
                redirectMode: 'POST',
                mobileNumber: body.number,
                paymentInstrument: {
                    type: 'PAY_PAGE'
                }
            };
            console.log("data", data);

            const payload = JSON.stringify(data);
            const payloadMain = Buffer.from(payload).toString('base64');
            const keyIndex = 1;
            const string = payloadMain + '/pg/v1/pay' + "58a63b64-574d-417a-9214-066bee1e4caa";
            const sha256 = crypto.createHash('sha256').update(string).digest('hex');
            const checksum = sha256 + '###' + keyIndex;

            const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
            const options = {
                method: 'POST',
                url: prod_URL,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum
                },
                data: {
                    request: payloadMain
                }
            };

            const response = await axios.request(options);

            return {
              success: true,
              redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
              message: 'Payment Initiated',
            };
        } catch (error) {
            console.log("errrrorrr", error)
            return {
                success: false,
                redirectUrl: "",
                message: error.message ?? "Internal Server Error."
            }
        }
    }

    async checkPaymentStatus(transactionId: string) {
        const merchantTransactionId = transactionId;

        const keyIndex = 1
        const string = `/pg/v1/status/${this.MERCHANT_ID}/${merchantTransactionId}` + this.MERCHANT_KEY
        const sha256 = crypto.createHash('sha256').update(string).digest('hex')
        const checksum = sha256 + '###' + keyIndex

        const xVerify = crypto
            .createHash('sha256')
            .update(checksum)
            .digest('hex') + `###${this.saltIndex}`;

        const res = await axios.get(`${this.baseUrl}/pg/v1/status/${this.MERCHANT_ID}/${transactionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': this.MERCHANT_ID,
            },
        });

        return res.data;
    }
}
