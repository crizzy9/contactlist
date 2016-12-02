import { Meteor } from 'meteor/meteor';

import { loadLists } from './imports/fixtures/lists';
import { loadEmails } from './imports/fixtures/emails';

import './imports/publications/lists';
import './imports/publications/contacts';
import '../both/methods/lists.methods';
import '../both/methods/contacts.methods';
import '../both/methods/emails.methods';

Meteor.startup(() => {
  loadLists();
  loadEmails();
});
