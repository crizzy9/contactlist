import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Lists } from '../../../../both/collections/lists.collection';
import { List } from '../../../../both/models/list.model';
import { Contacts } from '../../../../both/collections/contacts.collection';
import { Contact } from '../../../../both/models/contact.model';

import template from './lists-show.component.html';

export class Arr{
  contact: Contact;
  listnames: string[];

  constructor(_contact: Contact, _listnames: string[]){
    this.contact = _contact;
    this.listnames = _listnames;
  }
}

@Component({
  selector: 'lists-show',
  template
})

export class ListsShowComponent implements OnInit {
  lists: Observable<List[]>;
  // lists: List[]
  //listsSub: Subscription;
  contacts: Contact[];
  showres: boolean = false;
  arr: Arr[] = [];
  showtem: boolean = false;

  constructor(
    private zone: NgZone
  ){}

  ngOnInit() {
    /*this.listsSub = MeteorObservable.subscribe('lists').subscribe(() => {
      Meteor.call("showList", (err, resp) => {
        console.log("meteor method call");
        console.log(resp);
        this.zone.run(() => {this.lists = resp;});
      });
    });*/

    /*Meteor.call("showList", (err, resp) => {
      console.log("meteor method call");
      console.log(resp);
      this.zone.run(() => {this.lists = resp;});
    });*/

    //original method with publish
    /*this.listsSub = MeteorObservable.subscribe('lists').subscribe(() => {
      this.lists = Lists.find({}).zone();
    });*/
    this.updateListData();
  }

  updateListData(){
    Meteor.call("showList", (err, resp) => {
      console.log("meteor method call");
      console.log(resp);
      this.zone.run(() => {this.lists = resp;});
    });
  }

  search(value: string): void {
    //how to trigger it on change? how to trigger on enter
    this.arr = [];
    if(value.trim()==''){
      this.showres = false;
      return;
    }

    Meteor.call("searchContacts", value, (err, resp) => {
      console.log("in search contacts call");
      this.contacts = resp;
      //create array to store contact and listnames of all contacts and zone that
      for(let contact of this.contacts){
        let listnames: string[] = [];
        Meteor.call("getListNames", contact.list_id, (err, resp) => {
          console.log("in get listnames call");
          listnames = resp;
          this.pushinArr(contact, listnames);
          if(this.arr!=null){
            this.showres = true;
            this.zone.run(() => {this.arr;});
          }
        });
        /*for(let listId of contact.list_id){
          Meteor.call("listDetails", listId, (err, res) => {
            console.log("name: ",res.name);
            listnames.push(res.name);

            //fn call here pass listnames
          });
        }*/
        //this.arr.push(new Arr(contact, listnames));
        //console.log("listnames:  ",listnames);
      }
      //console.log(this.showres);
      console.log("array is ",this.arr);
      // this.zone.run(() => {this.arr});
      //console.log("after zone");
    });
  }

  //define a function take listnames and push it to the array
  pushinArr(contact: Contact, listnames){
    console.log("in push in arr");
    this.arr.push(new Arr(contact, listnames));
  }

  onAddList(changed: boolean){
    console.log("inside on add list", changed);
    if(changed == true){
      this.updateListData();
    }
    //changed? this.updateListData() : console.log("no data change");
  }

  showTemp(val: boolean){
    this.showtem = val;
    console.log(this.showtem);
  }

/*  ngOnDestroy() {
    this.listsSub.unsubscribe();
  }*/
}
