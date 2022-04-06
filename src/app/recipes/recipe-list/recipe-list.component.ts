import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipe.model';

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
