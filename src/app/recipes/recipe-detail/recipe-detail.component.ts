import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  private recipeIndex;
  private subscription: Subscription;
  constructor(private sls: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params.id;
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      }
    );
  }
  onEdit(): void{
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }
  onDelete(): void{
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }
  onAddToShoppingList(): void{
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
