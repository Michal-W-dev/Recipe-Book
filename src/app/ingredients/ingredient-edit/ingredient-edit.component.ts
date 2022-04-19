import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/shared-models/ingredients';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) ingForm: NgForm
  selectedIngIdx = -1;
  edit = false;
  ingredient: Ingredient;
  private selSub: Subscription;

  constructor(private ingrService: IngredientsService) { }

  ngOnInit(): void {
    this.selSub = this.ingrService.selectedIng.subscribe(idx => {
      this.selectedIngIdx = idx
      this.ingredient = this.ingrService.getIngredient(idx)
      this.edit = true;
    })
  }

  ngOnDestroy(): void {
    this.selSub.unsubscribe()
  }

  onSubmit(ingForm: NgForm) {
    const amount = +ingForm.value.amount
    const ingredient = { name: ingForm.value.name, amount }
    if (!this.edit) {
      this.ingrService.addIngredient(ingredient)
    } else {
      this.ingrService.editIngredient(ingredient, this.selectedIngIdx)
    }
    this.onClear()
  }

  onClear() {
    this.ingrService.selectedIng.next(-1)
    this.ingForm.reset()
    this.edit = false;
  }

  onDelete() {
    this.ingrService.deleteIngredient(this.selectedIngIdx);
    this.onClear()
  }

}
