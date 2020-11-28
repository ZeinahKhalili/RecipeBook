import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ingredient} from '../ingredient';
import {ShoppingListService} from './shopping-list.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;
  constructor(private  sls: ShoppingListService) { }


  onSubmit(ingredient: Ingredient): void{
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if (!this.isAdd){
      this.sls.editItem(this.item, newIngredient);
      this.onClear();
    }
    else{
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
   if (changes.item.currentValue === null){
      this.isAdd = true;
      this.item = {name: null, amount: null};
   } else {
     this.isAdd = false;
   }
  }
  onDelete(): void{
    this.sls.deleteItem(this.item);
    this.onClear();
  }
  onClear(): void{
    this.isAdd = true;
    this.cleared.emit(null);
  }


}
