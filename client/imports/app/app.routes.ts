import { Route } from '@angular/router';

import { ListsShowComponent } from './lists/lists-show.component';
import { ListDetailsComponent } from './lists/list-details.component';
// import { ContactsShowComponent } from './contacts/contacts-show.component';

export const routes: Route[] = [
  { path: '', component: ListsShowComponent },
  { path: 'list/:listId', component: ListDetailsComponent }
  // { path: 'contacts/:listId', component: ContactsShowComponent}
];
