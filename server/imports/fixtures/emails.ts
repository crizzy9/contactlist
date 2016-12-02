import { Emails } from '../../../both/collections/emails.collection';
import { Email } from '../../../both/models/email.model';

export function loadEmails(){
  console.log("inside load EMAILS");
  // if (Emails.find().cursor.count() === 0){
  if(Emails.find().count() === 0){
    const emails: Email[] = [{
      tempname: 'default',
      subject: 'Default Template',
      text: 'This is the default template'
    },{
      tempname: 'temp1',
      subject: 'Template 1',
      text: 'This is template 1'
    },{
      tempname: 'temp2',
      subject: 'Template 2',
      text: 'This is template 2'
    }];

    emails.forEach((email: Email) => Emails.insert(email));
  }
}
