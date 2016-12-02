import { Lists } from '../../../both/collections/lists.collection';
import { List } from '../../../both/models/list.model';

export function loadLists() {
  // if (Lists.find().cursor.count() === 0) {
  if(Lists.find().count() === 0){
    const lists: List[] = [{
      name: 'Mumbai List',
      description: 'These are all the contacts i gathered in Mumbai'
    },{
      name: 'Bangalore List',
      description: 'Theses are all the contacts i gathered in Bangalore'
    },{
      name: 'Rajkot List',
      description: 'These are all the contacts i gathered in Rajkot'
    }];

    lists.forEach((list: List) => Lists.insert(list));
  }
}
