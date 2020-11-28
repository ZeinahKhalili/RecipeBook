import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
    items: Ingredient[] = [];
    selectedItem: Ingredient = null;
  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.items = this.sls.getItems();
  }
  onSelectItem(item: Ingredient): void{
    this.selectedItem = item;
  }
  onCleared(): void{
    this.selectedItem = null;
  }

}
