import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contacts } from '../../../../both/collections/contacts.collection';
import { Contact } from '../../../../both/models/contact.model';

import template from './contacts-form.component.html';

@Component({
  selector: 'contacts-form',
  template
})

export class ContactsFormComponent implements OnInit {
  addForm: FormGroup;
  @Input() listId: string;
  @Output() onAddContact = new EventEmitter<boolean>();
  contact: Contact;

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
      //list_id: [listId]
    });
  }

  addContact(): void {
    if(this.addForm.valid){
      /*this.contact = Contacts.findOne({ firstname:this.addForm.value.firstname, lastname:this.addForm.value.lastname, email:this.addForm.value.email })
      console.log(Contacts.find({}).fetch());
      //what if i make listid? as the field so it doesnt delete it from minimongo? maybe?
      if(this.contact == null){
        console.log("Contact not in db");
        this.contact = {
          firstname: "",
          lastname: "",
          email: "",
          list_id: [],
        };
        this.contact.firstname = this.addForm.value.firstname;
        this.contact.lastname = this.addForm.value.lastname;
        this.contact.email = this.addForm.value.email;
        this.contact.list_id = [this.listId];
        Contacts.insert(this.contact);
      }
      else{
        console.log("contact already in db");
        Contacts.update(
          {_id: this.contact._id},
          {$addToSet: {list_id: this.listId}}
        );
      }*/

      // update using just one query but it wont work on the client side you need to use the server side or give it allow to client
      /*Contacts.update(
        { firstname:this.addForm.value.firstname, lastname:this.addForm.value.lastname, email:this.addForm.value.email },
        { $addToSet: { list_id: this.listId } },
        { upsert: true }
      );*/

      Meteor.call("contactAdd", this.addForm.value, this.listId, (err, resp) => {
        console.log("in contact add call");
        //handle contact already exists too
      });
      this.addForm.reset();
      this.onAddContact.emit(true);
    }
  }
}
