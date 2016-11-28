import { Meteor } from 'meteor/meteor';
import { Lists } from '../../../both/collections/lists.collection';

Meteor.publish('lists', function() {
  return Lists.find();
});
