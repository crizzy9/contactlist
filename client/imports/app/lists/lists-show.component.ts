import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Lists } from '../../../../both/collections/lists.collection';
import { List } from '../../../../both/models/list.model';

import template from './lists-show.component.html';

@Component({
  selector: 'lists-show',
  template
})

export class ListsShowComponent {
  lists: Observable<List[]>;

  constructor() {
    this.lists = Lists.find({}).zone();
  }
}
