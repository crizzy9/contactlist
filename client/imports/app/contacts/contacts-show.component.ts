import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  @Input() listId: string;
  @Input() listname: string;
  contact: Contact;
  contacts: Observable<Contact[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit() {
    this.contacts = Contacts.find({list_id: {
      $eq: this.listId
    }});
    /*this.paramsSub = this.route.params
      .map(params => params['listId'])
      .subscribe(listId => {
        this.listId = listId;
        this.contacts = Contacts.find({list_id: {
          $eq: this.listId
        }});
      });*/
  }
}
