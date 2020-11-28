import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Pork Chops', 'Pork Chops with Fig and Grape Agrodolce' , 'https://assets.epicurious.com/photos/59d3b675db1b7a7ffca98a9c/1:1/w_400%2Cc_limit/GFAF-Pork-Chops-with-Grape-and-Fig-Agrodolce-and-Radicchio-Salad-recipe-28092017.jpg',
      [new Ingredient('Pork shops', 1), new Ingredient('Figs', 3), new Ingredient('Grapes', 5)]),
    new Recipe('Chicken Stew', 'Chicken Stew with Potatoes and Radishes' , 'https://assets.epicurious.com/photos/5a4fa93209ac40666fea8cdb/1:1/w_400%2Cc_limit/Slow-Cooked-Chicken-Paprikash-with-potatoes-03012018.jpg',
      [new Ingredient('Chicken', 3), new Ingredient('Potatoes', 5), new Ingredient('Radishes', 2)]),
    new Recipe('Charred Chicken', 'Charred Chicken with Sweet Potatoes and Oranges' , 'https://assets.epicurious.com/photos/588a497e15872cb7073f2240/1:1/w_400%2Cc_limit/charred-chicken-with-sweet-potatoes-and-oranges-BA-011917.jpg',
      [new Ingredient('Chicken', 4
    ), new Ingredient('Sweet Potato', 3), new Ingredient('Oranges', 2
    )]),
    new Recipe('Tomato Tart ', 'Tomato Tart with Chickpea Crumble' , 'https://assets.epicurious.com/photos/59b6c7c5c8db02177fafeb9c/1:1/w_400%2Cc_limit/Tomato-Tart-With-Chickpea-Crumble-06092017.jpg',
      [new Ingredient('Tomato', 10), new Ingredient('Chickpea', 10), new Ingredient('Basil', 5)]),
    new Recipe(' Oil–Confit Chicken', 'Olive Oil–Confit Chicken with Cipolline Onions' , 'https://assets.epicurious.com/photos/5a05db0ed63f7339eb97b580/1:1/w_400%2Cc_limit/olive-oil-confit-chicken-with-cipolline-onions-recipe-BA-111017.jpg',
      [new Ingredient('Olive Oil', 5), new Ingredient('Chicken', 7), new Ingredient('Onions', 8)])
  ];
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getRecipes(){
    return this.recipes;
  }
  // tslint:disable-next-line:typedef
  getRecipe(id: number){
    return this.recipes[id];
  }
  // tslint:disable-next-line:typedef
  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }
  addRecipe(recipe: Recipe): void{
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe): void{
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }
  storeData(): any{
    const body = JSON.stringify(this.recipes);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipebook-f3de4.firebaseio.com/recipes.json' , body,  {headers});
  }
  // tslint:disable-next-line:typedef
  /*fetchData(): Subscription{
    return this.http.get('https://recipebook-f3de4.firebaseio.com/recipes.json')
      .pipe(
        map((response: HttpResponse<Recipe[]>) => {
          return response.json();
        })
      )
      .subscribe((data: Recipe[]) => {
        return this.recipes = data;
      } );
  }
  */
  public fetchData(): any{
    return this.http.get('https://recipebook-f3de4.firebaseio.com/recipes.json')
      .subscribe((data: any[]) => {
        console.log(data);
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      });
  }
}
