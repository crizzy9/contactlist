import { MongoObservable } from 'meteor-rxjs';

import { List } from '../models/list.model';

export const Lists = new MongoObservable.Collection<List>('lists');
