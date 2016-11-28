import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Contacts } from '../../../../both/collections/contacts.collection';
import { Contact } from '../../../../both/models/contact.model';
// import { Lists } from '../../../../both/collections/lists.collection';
// import { List } from '../../../../both/models/list.model';

import template from './contacts-show.component.html';

@Component({
  selector: 'contacts-show',
  template
})

export class ContactsShowComponent implements OnInit {
  //listId: string;
  //paramsSub: Subscription;
  contactId: string;
  @Input() listId: string;
  @Input() listname: string;
  editing: boolean = false;
  contact: Contact;
  contact2: Contact;
  contacts: Observable<Contact[]>;
  contactsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit() {

    this.contactsSub = MeteorObservable.subscribe('contacts', this.listId).subscribe(() => {
      console.log(Contacts.find({}).fetch());
      this.contacts = Contacts.find({list_id: { $eq: this.listId }}).zone();
      //this.contacts = Contacts.find({}).zone();
    });

    // this.contacts = Contacts.find({list_id: {
    //   $eq: this.listId
    // }});

    /*this.paramsSub = this.route.params
      .map(params => params['listId'])
      .subscribe(listId => {
        this.listId = listId;
        this.contacts = Contacts.find({list_id: {
          $eq: this.listId
        }});
      });*/
  }

  removeContact(contact: Contact): void {
    Contacts.update({_id: contact._id},{$pull: {list_id: this.listId}});
  }

  editContact(contact: Contact): void {
    this.contactId = contact._id;
    this.contact = contact;
    this.editing = true;
  }

  saveContact(): void {
    this.contact2 = Contacts.findOne({firstname: this.contact.firstname, lastname: this.contact.lastname, email: this.contact.email});
    //==null not working so use return;
    if(this.contact2 == null){
      Contacts.update(this.contactId, {
        $set: {
          firstname: this.contact.firstname,
          lastname: this.contact.lastname,
          email: this.contact.email
        }
      });
    }
    else{
      console.log("contact already exists")
    }
    this.editing = false;
  }

  ngDestroy() {
    this.contactsSub.unsubscribe();
  }
}
