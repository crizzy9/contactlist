import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private router: Router
  ){}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['listId'])
      .subscribe(listId => {
        this.listId = listId;
        this.list = Lists.findOne(this.listId);
      });
  }

  removeList(): void {
    Lists.remove(this.list._id);
    this.router.navigateByUrl('/');
  }

  editList(): void{
    this.editing = true;
  }

  saveList(): void {
    Lists.update(this.list._id, {
      $set: {
        name: this.list.name,
        description: this.list.description
      }
    });
    this.router.navigateByUrl('/');
  }

  // cancelEdit() {
  //   this.editing = false;
  // }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
