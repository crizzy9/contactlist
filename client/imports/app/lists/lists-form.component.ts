import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Lists } from '../../../../both/collections/lists.collection';

import template from './lists-form.component.html';

@Component ({
  selector: 'lists-form',
  template
})

export class ListsFormComponent implements OnInit {
  addForm: FormGroup;
  @Output() onAddList = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      name:['', Validators.required],
      description:[]
    });
  }

  addList(): void {
    if(this.addForm.valid){
      //Lists.insert(this.addForm.value);
      Meteor.call("listInsert", this.addForm.value, (err, resp) => {
        console.log("inside list insert call");
      });
      this.addForm.reset();
      this.onAddList.emit(true);
    }
  }
}
