import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private readonly mailService: MailService, 
  ) {}
  
  async create(createContactDto: CreateContactDto) {

    try{

      const newContact = new this.contactModel(createContactDto);
      const savedContact = await newContact.save(); // Save to MongoDB

      if(!savedContact){
        return {
          status: 400,
          message: 'Failed to submit contact form',
          data: savedContact,
        };
      }
      
      // Send email notification
      this.mailService.sendContactMail(createContactDto);
      
      return {
        status: 200,
        message: 'Successfully submitted data. We will get back to you soon!',
        data: savedContact,
      };
    }catch(error){
      return {
        status: 400,
        message: 'Failed to submit contact form.',
        error: error.message,
      };
    }
  }
}
