import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/shared-models/ingredients';
import { AlertService } from './alert.service';
import { Recipe } from './recipes/recipe.model';

@Injectable()
export class RecipeService implements OnInit {
  // recipe = new Subject<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Dish name 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perspiciatis.',
      'https://unsplash.com/photos/_3dTLrMwiW8/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ3ODg5NjQw&force=true&w=1920',
      [new Ingredient('Noodles', 2), new Ingredient('Olive', 2)]),
    new Recipe('Dish name 2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perspiciatis.',
      'https://unsplash.com/photos/G7eI_KNp7iw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ3OTU1Mzcx&force=true&w=1920',
      [new Ingredient('Noodles', 2), new Ingredient('Olive', 2)]),
  ]
  constructor(private alertService: AlertService) { }

  ngOnInit(): void { }

  getRecipe(id: number) { return this.recipes[id] }

  get getRecipes() { return this.recipes }

  deleteRecipe(id: number) {
    const recipe = this.recipes[id].name
    this.recipes.splice(id, 1)
    this.alertService.showAlert(`${recipe} was deleted.`, 'success')
  }

  editRecipe(id: number, editedRecipe: Recipe) {
    this.recipes[id] = editedRecipe
    this.alertService.showAlert(`${editedRecipe.name} was updated.`, 'success')
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.alertService.showAlert(`${recipe.name} was added.`, 'success')
  }

  // changeRecipe(index: number) { this.recipe.next(this.recipes[index]) }
}

