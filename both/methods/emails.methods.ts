import { Emails } from '../collections/emails.collection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  loadEmailTemp: function(tempn: string){
    console.log("in load email temp method");
    let temp = Emails.findOne({tempname: tempn});
    console.log(temp);
    return temp;
    // check for null then default template
  },
  getAllTemplates: function() {
    console.log("in get all templates");
    //let temps = Emails.find({},{fields: {tempname: 1}}).cursor.fetch();
    let temps = Emails.find({}).cursor.fetch();
    // let temps = Emails.find({});
    return temps;
  },
  newTemplate: function(tempn: string) {
    console.log("in new template method");
    let error = false;

    let result = Emails.insert({
      tempname: tempn,
      subject: '',
      text: ''
    });
    // it is not returning the subscribe because of the delay so use fibers and futures to wait for the process to finish
    console.log(result);
    return result;

    /*result.subscribe(x => {
      console.log(x);
    }, e => {
      console.log("ERROR", e);
      error = true;
      console.log(error);
    })
    console.log("error?", error);
    if(error){
      console.log("ERRORRRRRR");
      return false;
    }
    else{
      return result;
    }*/
  },
  saveEmailTemp: function(value: any) {
    console.log("in save email temp method");
    /*Lists.update(listId,{
      $set: {
        emailTemp:{
          subject: value.subject,
          text: value.text
        }
      }
    });*/
  }
});
