import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Lists } from '../../../../both/collections/lists.collection';
import { List } from '../../../../both/models/list.model';

import template from './list-details.component.html';

@Component({
  selector: 'list-details',
  template
})

export class ListDetailsComponent implements OnInit, OnDestroy {
  listId: string;
  paramsSub: Subscription;
  list: List;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ){}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['listId'])
      .subscribe(listId => {
        this.listId = listId;
        Meteor.call("listDetails", this.listId, (err, resp) => {
          console.log("inside list details call");
          this.zone.run(() =>{this.list = resp});
        });
        //this.list = Lists.findOne(this.listId);
      });
      console.log(this.list);
      // inside call it displays the list but here outside it doesnt why???
  }

  removeList(): void {
    //console.log("remove ",Lists.find({}).fetch());
    //Lists.remove(this.list._id);
    //call for remove contacts from contacts-show to remove the contacts belonging to this list

    Meteor.call("listRemove", this.list._id, (err, resp) => {
      console.log("in list remove call");
    });

    this.router.navigateByUrl('/');
  }

  editList(): void{
    this.editing = true;
  }

  saveList(): void {
    this.editing = false;
    Meteor.call("listUpdate", this.list._id, this.list.name, this.list.description, (err, resp) => {
      console.log("inside list update call");
      // you can make editing false here but then youll have to zone it!
    });
    /*Lists.update(this.list._id, {
      $set: {
        name: this.list.name,
        description: this.list.description
      }
    });*/
    //this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
