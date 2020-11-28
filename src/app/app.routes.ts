import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './home.component';

export const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: () => import('src/app/recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', component: ShoppingListComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
