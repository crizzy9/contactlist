import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Lists } from '../../../../both/collections/lists.collection';

import template from './lists-form.component.html';

@Component ({
  selector: 'lists-form',
  template
})

export class ListsFormComponent implements OnInit {
  addForm: FormGroup;

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
      Lists.insert(this.addForm.value);
      this.addForm.reset();
    }
  }
}
