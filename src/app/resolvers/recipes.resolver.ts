import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { FbDataService } from '../services/fb-data.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[] | null> {
  constructor(private db: FbDataService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | null {
    const recipes = this.recipeService.getRecipes;
    return (recipes.length) ? null : this.db.fetchRecipes();
  }
}
