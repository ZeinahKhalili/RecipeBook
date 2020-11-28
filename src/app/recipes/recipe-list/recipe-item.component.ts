import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../recipe';
@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent  {

  @Input() recipe: Recipe;
  @Input() recipeId: number;


}
