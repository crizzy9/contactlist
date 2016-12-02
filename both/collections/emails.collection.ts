import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Email } from '../models/email.model';

export const Emails = new MongoObservable.Collection<Email>('emails');
// export const Emails = new Mongo.Collection<Email>('emails');

function opAllow() {
  return true;
}

Emails.allow({
  insert: opAllow,
  update: opAllow,
  remove: opAllow
});
