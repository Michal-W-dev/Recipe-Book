import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { IngredientsListComponent } from './ingredients/ingredients-list/ingredients-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesResolver } from './resolvers/recipes.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: RecipeEditComponent, pathMatch: 'full' },
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
    ]
  },
  { path: 'shopping-list', component: IngredientsListComponent },
  { path: 'shopping-list/:name/:amount', component: IngredientsListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
