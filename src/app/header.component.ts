import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipes/recipe.service';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor( private recipeService: RecipeService, private alertService: AlertService) { }
  onStore(): void{
    this.recipeService.storeData().subscribe(
      data => this.alertService.success('Stored Successfully'),
      error => this.alertService.danger('Error in storing!')
    );
  }
  onFetch(): void{
      this.recipeService.fetchData();
  }

}
