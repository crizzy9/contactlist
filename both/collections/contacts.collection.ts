import { MongoObservable } from 'meteor-rxjs';

import { Contact } from '../models/contact.model';

export const Contacts = new MongoObservable.Collection<Contact>('contacts');
