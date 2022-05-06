import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients';
import { AlertService } from './alert.service';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  // recipes: Recipe[] = [
  //   new Recipe('Dish name 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perspiciatis.',
  //     'https://unsplash.com/photos/_3dTLrMwiW8/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ3ODg5NjQw&force=true&w=1920',
  //     [new Ingredient('Noodles', 2), new Ingredient('Olive', 2)]),
  //   new Recipe('Dish name 2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perspiciatis.',
  //     'https://unsplash.com/photos/G7eI_KNp7iw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ3OTU1Mzcx&force=true&w=1920',
  //     [new Ingredient('Noodles', 2), new Ingredient('Olive', 2)]),
  // ]
  constructor(private alertService: AlertService) { }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    console.log(1, this.recipes)
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) { return this.recipes[id] }

  get getRecipes() { return this.recipes }

  deleteRecipe(id: number) {
    const recipe = this.recipes[id].name
    this.recipes.splice(id, 1)
    this.alertService.showAlert(`${recipe} was deleted.`, 'success')
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(id: number, editedRecipe: Recipe) {
    this.recipes[id] = editedRecipe
    this.alertService.showAlert(`${editedRecipe.name} was updated.`, 'success')
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.alertService.showAlert(`${recipe.name} was added.`, 'success')
    this.recipesChanged.next(this.recipes.slice());
  }

}
