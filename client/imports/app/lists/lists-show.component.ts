import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Lists } from '../../../../both/collections/lists.collection';
import { List } from '../../../../both/models/list.model';

import template from './lists-show.component.html';

@Component({
  selector: 'lists-show',
  template
})

export class ListsShowComponent {
  lists: Observable<List[]>;
  listsSub: Subscription;

  constructor(){}

  ngOnInit() {
    this.listsSub = MeteorObservable.subscribe('lists').subscribe(() => {
      this.lists = Lists.find({}).zone();
    });
  }

  ngOnDestroy() {
    this.listsSub.unsubscribe();
  }
}
