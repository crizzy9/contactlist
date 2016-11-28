import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../../both/collections/contacts.collection';

Meteor.publish('contacts', function(listId: string) {
  console.log("listid is:",listId);
  //console.log(Contacts.find({ list_id: { $eq: listId }}).cursor.fetch());
  return Contacts.find({ list_id: { $eq: listId }});
})
