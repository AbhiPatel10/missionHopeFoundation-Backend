import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // using Gmail
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // Your Gmail
        pass: this.configService.get<string>('EMAIL_PASS'),   // App password from Gmail (2FA enabled)
      },
    });
  }

  async sendContactMail(contactData: any) {
    const { name, email, phone, subject, message } = contactData;

    const mailOptions = {
      from: '"Contact Form" <yourgmail@gmail.com>', // sender address
      to: 'abhipatel.dev@gmail.com',               // receiver address
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
