import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { List } from '../../../../both/models/list.model';
import { Email } from '../../../../both/models/email.model';

import template from './email-form.component.html';

@Component({
  selector: 'email-form',
  template
})

export class EmailFormComponent implements OnInit {
  // emailForm: FormGroup;
  email: Email;
  emails: Email[];
  tempname: string;
  newt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone
  ){}

  ngOnInit(){
    this.email = {
      tempname: '',
      subject: '',
      text: ''
    }
    /*this.emailForm = this.formBuilder.group({
      // from will be predecided and to will be either all contacts or selected ones
      // from: ['', Validators.required],
      // to: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });*/
    //getAllTemplates then call load default template
    this.getAllTemp();
    this.tempname="default";
    this.loadTemplate(this.tempname);
    //this.zone.run(() => {this.email = this.list.emailTemp;});
  }

  loadTemplate(temp: string){
    //send tempname along with based on value

    Meteor.call("loadEmailTemp", temp, (err, resp) => {
      console.log("in load email temp call", resp);
      this.email = resp;
      console.log(this.email);
      this.zone.run(() => {this.email;});
    });
  }

  getAllTemp() {
    Meteor.call("getAllTemplates", (err, resp) => {
      console.log("in get all templates method");
      this.zone.run(() => {this.emails = resp;});
    });
  }

  changeTemp(value: string){
    this.tempname = value;
    console.log("in change template",value);
    this.loadTemplate(value);
  }

  newTemp(val: boolean){
    this.newt = val;
    if(val == false){
      Meteor.call("newTemplate", this.tempname, (err, resp) => {
        console.log(resp);
        resp.subscribe(x => {
          console.log(x);
        }, e => {
          console.log(e);
        })
        console.log("in new template call", resp);
        if(resp == false){
          alert("template name already in use");
        }
        else{
          this.getAllTemp();
          this.loadTemplate(this.tempname);
        }
      });
    }
  }

  saveTemp(): void {
    alert('Function coming soon');
    //if you wanna check for form validity without form group how to do it?
    /*if(this.emailForm.valid){
      Meteor.call("saveEmailTemp", this.emailForm.value, (err,resp) => {
        console.log("in save email temp call");
        alert('Function coming soon!');
      });
      //save will keep the view as it is but disable button if no change or send a message for no change
    }*/
  }
}
