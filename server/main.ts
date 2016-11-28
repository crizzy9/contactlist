import { Meteor } from 'meteor/meteor';

import { loadLists } from './imports/fixtures/lists';

import './imports/publications/lists';
import './imports/publications/contacts';

Meteor.startup(() => {
  loadLists();
});
