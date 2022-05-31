import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  ingsEmitter = new Subject<Ingredient[]>()
  selectedIng = new Subject<number>()

  private ingredients: Ingredient[] = [new Ingredient('apples', 5), new Ingredient('oranges', 7), new Ingredient('olive', 7)]
  public newIngredients: Ingredient[] = []
  constructor(private alertService: AlertService, private titleCasePipe: TitleCasePipe) { }

  getIngredient(idx: number) { return this.ingredients[idx] }

  getIngredients() { this.ingsEmitter.next([...this.ingredients]) }

  deleteIngredient(idx: number) {
    this.alertService.showAlert(`${this.titleCase(this.ingredients[idx].name)} were deleted`, 'danger')
    this.ingredients = this.ingredients.filter((ing, i) => idx !== i)
    this.ingsEmitter.next([...this.ingredients])
  }


  addIngredientAlert(ingredientName: string) {
    this.alertService.showAlert(`${this.titleCase(ingredientName)} was added`, 'success')
    // this.checkIngExistence(newIngredient, ingredientList)
    // this.ingsEmitter.next([...this.ingredients])
  }

  editIngredientAlert(editedIngredient: Ingredient, prevIngredient: Ingredient) {
    const { name, amount } = editedIngredient;
    const { name: prevName, amount: prevAmount } = prevIngredient;
    if (name === prevName && amount === prevAmount) {
      this.alertService.showAlert(`No change was made`)
    } else {
      let msg = `${this.titleCase(prevName)} (${prevAmount}) was changed to - ${this.titleCase(name)} (${amount})`
      this.alertService.showAlert(msg, 'success')
    }
  }


  addIngredientsAlert(newIngredients: Ingredient[]) {
    this.alertService.showAlert(`${newIngredients.map(el => ' ' + this.titleCase(el.name))} from recipe were added.`, 'success')
    // newIngredients.forEach(ingEl => this.checkIngExistence(ingEl, ingredientList))
    // this.getIngredients()
  }

  // Functions helpers
  private titleCase(item: string) { return this.titleCasePipe.transform(item) }

  private checkIngExistence({ name, amount }: Ingredient, currentIngredients: Ingredient[]) {
    let existItem = currentIngredients.find(el => {
      if (name.toLowerCase() === el.name.toLowerCase()) { el.amount += amount; return true }
      else return false
    })
    if (!existItem) this.ingredients.push({ name, amount })
  }

}
