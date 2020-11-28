import {Ingredient} from '../ingredient';

export class ShoppingListService {
  private items: Ingredient[] = [];
  constructor() { }

  // tslint:disable-next-line:typedef
    getItems(){
    return this.items;
    }
  // tslint:disable-next-line:typedef
    addItems(items: Ingredient[]){
    Array.prototype.push.apply(this.items, items);
    }
    addItem(item: Ingredient): void {
    this.items.push(item);
    }
    editItem(oldItem: Ingredient, newItem: Ingredient): void{
    this.items[this.items.indexOf(oldItem)] = newItem;
    }
    deleteItem(item: Ingredient): void {
    this.items.splice(this.items.indexOf(item), 1);
    }
}
