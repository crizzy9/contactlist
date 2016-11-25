import { Meteor } from 'meteor/meteor';

import { loadLists } from './imports/fixtures/lists';

Meteor.startup(() => {
  loadLists();
});
