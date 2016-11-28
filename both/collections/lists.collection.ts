import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { List } from '../models/list.model';

export const Lists = new MongoObservable.Collection<List>('lists');

function opAllow() {
  return true;
}

Lists.allow({
  insert: opAllow,
  update: opAllow,
  remove: opAllow
});
