import { Lists } from '../collections/lists.collection';
//import { Contacts } from '../collections/contacts.collection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

//some function

Meteor.methods({
  showList: function () {
    console.log("in showlist method");
    // let lists = Lists.find({}).cursor.fetch();
    let lists = Lists.find({}).fetch();
    // console.log(lists);
    return lists;
  },
  listDetails: function(listId: string) {
    check(listId, String);
    console.log("in listDetails method");
    let list = Lists.findOne(listId);
    return list;
  },
  listUpdate: function(listId: string, listname: string, listdesc: string) {
    check(listId, String);
    check(listname, String);
    check(listdesc, String);
    console.log("in listUpdate method");
    Lists.update(listId,{
      $set: {
        name: listname,
        description: listdesc
      }
    });
  },
  listInsert: function(value: any) {
    console.log("in list insert method");
    Lists.insert(value);
  },
  listRemove: function(listId: string) {
    check(listId, String);
    console.log("in list remove method");
    let contacts: any;
    Meteor.call("listContacts", listId, (err, resp) => {
      contacts = resp;
    });
    //console.log(contacts);

    for (let contact of contacts){
      console.log("inside for loop", contact);
      Meteor.call("contactRemove",contact._id, listId);
    }

    Lists.remove(listId);
  },
  getListNames: function(listids: string[]) {
    console.log("in get listnames method");
    // return Lists.find({ _id: { $in: listids}},{ fields: {name: 1}}).cursor.fetch();
    return Lists.find({ _id: { $in: listids}}, { fields: {name: 1}}).fetch();
  }

});
