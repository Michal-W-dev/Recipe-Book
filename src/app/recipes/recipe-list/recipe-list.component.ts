import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[]
  recipes: Recipe[]

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeList = this.recipeService.recipes
  }
}
