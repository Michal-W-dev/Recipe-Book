import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IngredientsService } from 'src/app/ingredients/ingredients.service';
import { RecipeService } from 'src/app/recipe.service';
import { Ingredient } from 'src/shared-models/ingredients';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;
  constructor(public recipeService: RecipeService, private ingService: IngredientsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']
      this.recipe = this.recipeService.getRecipe(this.recipeId)
    })
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['/recipes'])
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.router.navigate(['/shopping-list'])
    this.ingService.addIngredients(ingredients)
  }
}
