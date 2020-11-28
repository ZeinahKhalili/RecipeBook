import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListAddComponent} from './shopping-list-add.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';

@NgModule({
  declarations: [
  ShoppingListComponent,
  ShoppingListAddComponent,
    ],
  imports: [
    FormsModule,
    SharedModule
  ]
})
export class ShoppingListModule {

}
