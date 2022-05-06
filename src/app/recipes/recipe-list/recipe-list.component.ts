import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FbDataService } from 'src/app/services/fb-data.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[] = [];
  subRecipe: Subscription;

  constructor(private recipeService: RecipeService, private db: FbDataService) {

  }

  ngOnInit(): void {
    this.subRecipe = this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipeList = recipes
    })
    this.recipeList = this.recipeService.getRecipes;
  }
  ngOnDestroy() {
    this.subRecipe.unsubscribe();
  }
}
