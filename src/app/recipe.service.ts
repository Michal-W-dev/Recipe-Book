import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/shared-models/ingredients';
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
  constructor() { }

  ngOnInit(): void { }

  getRecipe(id: number) { return this.recipes[id] }

  // changeRecipe(index: number) { this.recipe.next(this.recipes[index]) }
}

