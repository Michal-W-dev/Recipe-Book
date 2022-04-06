import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Ingredient } from 'src/shared-models/ingredients';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild(`f`) signForm: NgForm;
  recipe: Recipe;
  isEdited = false;
  constructor(public recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id']

      if (id >= 0) {
        this.isEdited = true
        this.recipe = this.recipeService.getRecipe(+params['id'])
        console.log('fsdkjhfsd', this.recipeService.getRecipe(+params['id']))
      }
      else {
        this.isEdited = false
        this.recipe = new Recipe('', '', '', [new Ingredient('', 0)]);
      }
    })
  }
  // ngDoCheck() { console.log(this.signForm?.value.name) }

  onSubmit(form: NgForm) { console.log(form.value) }
}
