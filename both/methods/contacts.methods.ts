import { Contacts } from '../collections/contacts.collection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

//some function

Meteor.methods({
  listContacts: function(listId: string) {
    check(listId, String);
    console.log("inside list contacts method");
    let contacts = Contacts.find({ list_id: { $eq: listId }}).cursor.fetch();
    // let contacts = Contacts.find({ list_id: { $eq: listId}});
    //let contacts = Contacts.find({list_id: {$eq: listId}});
    //console.log(contacts);
    return contacts;
  },
  contactAdd: function(value: any, listId: string) {
    check(listId, String);
    console.log("in contact add method");
    Contacts.update(
      { firstname: value.firstname, lastname: value.lastname, email: value.email },
      { $addToSet: {list_id: listId }},
      { upsert: true }
    );
  },
  contactRemove: function(contactId: string, listId: string) {
    check(contactId, String);
    check(listId, String);
    console.log("in contact remove method");
    Contacts.update({_id: contactId},{$pull: {list_id: listId}});
  },
  contactEdit: function(contact) {
    console.log("in contact edit method");
    let con = Contacts.findOne({firstname: contact.firstname, lastname: contact.lastname, email: contact.email});
    if(con == null){
      console.log("contact is new");
      Contacts.update(contact._id, {
        $set: {
          firstname: contact.firstname,
          lastname: contact.lastname,
          email: contact.email
        }
      });
      return true;
    }
    else{
      console.log("contact already exists");
      return false;
    }
  },
  searchContacts: function(name: string) {
    check(name, String);
    console.log("in search contacts method");
    let contacts = Contacts.find(name ? { firstname: name}: {}).cursor.fetch();
    // let contacts = Contacts.find(name ? { firstname: name}: {});
    return contacts;
  }
});
