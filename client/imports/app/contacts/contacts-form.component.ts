import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contacts } from '../../../../both/collections/contacts.collection';

import template from './contacts-form.component.html';

@Component({
  selector: 'contacts-form',
  template
})

export class ContactsFormComponent implements OnInit {
  addForm: FormGroup;
  @Input() listId: string;

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
      console.log(this.addForm.value);
      Contacts.update(
        { firstname:this.addForm.value.firstname, lastname:this.addForm.value.lastname, email:this.addForm.value.email },
        { $addToSet: { list_id: this.listId } },
        { upsert: true }
      );
      this.addForm.reset();
    }
  }
}
