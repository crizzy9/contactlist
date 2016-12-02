import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LISTS_DECLARATIONS } from './lists';
import { CONTACTS_DECLARATIONS } from './contacts';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...LISTS_DECLARATIONS,
    ...CONTACTS_DECLARATIONS
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
