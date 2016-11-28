import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Contact } from '../models/contact.model';

export const Contacts = new MongoObservable.Collection<Contact>('contacts');

function opAllow() {
  return true;
}

Contacts.allow({
  insert: opAllow,
  update: opAllow,
  remove: opAllow
});
