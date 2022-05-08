import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FbDataService {
  private url = 'https://recipe-12-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes;
    this.http.put(`${this.url}/recipes.json`, recipes)
      .subscribe(response => { console.log(response) });
  }

  fetchRecipes() {
    // const token = this.auth.user.value?.token
    return this.http.get<Recipe[]>(`${this.url}/recipes.json`)
      .pipe(
        map(recipes => recipes.map(recipe => ({
          ...recipe, ingredients: recipe.ingredients || []
        })
        )),
        tap(recipes => this.recipeService.setRecipes(recipes))
      )
    // .subscribe({ next: recipes => this.recipeService.setRecipes(recipes) })
  }
}
