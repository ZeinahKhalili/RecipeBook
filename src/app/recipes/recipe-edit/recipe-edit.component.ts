import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipe';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [
  ]
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
            this.isNew = false;
            this.recipeIndex = +params.id;
            this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else{
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  onSubmit(): void{
    const newRecipe = this.recipeForm.value;
    if (this.isNew){
      this.recipeService.addRecipe(newRecipe);
    }
    else{
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }
  onCancel(): void{
    this.navigateBack();
  }
  onAddItem(name: string, amount: string): void{
    (this.recipeForm.controls.ingredients as FormArray).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount,
          [Validators.required, Validators.pattern('\\d+')
          ])
      })
    );
  }
  onRemoveItem(index: number): void{
    (this.recipeForm.controls.ingredients as FormArray).removeAt(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private navigateBack(): void{
    this.router.navigate(['../recipes']);
  }

  private initForm(): void{
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    const recipeIngredients: FormArray = new FormArray([]);
    if (!this.isNew){
      if (this.recipe.hasOwnProperty('ingredients')){
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.recipe.ingredients.length; i++){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount,
                [Validators.required, Validators.pattern('\\d+')
                ])
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }
}
