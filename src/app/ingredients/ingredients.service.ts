import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/shared-models/ingredients';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  ingsEmitter = new Subject<Ingredient[]>()
  // ingEmitter = new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[] = [new Ingredient('apples', 5), new Ingredient('oranges', 7), new Ingredient('olive', 7)]
  constructor() { }
  getIngredients() {
    this.ingsEmitter.next([...this.ingredients])
    // return this.ingredients.slice()
  }

  checkIngExistence({ name, amount }: Ingredient) {
    let existItem = this.ingredients.find(el => {
      if (name.toLocaleLowerCase() === el.name.toLocaleLowerCase()) { el.amount += amount; return true }
      else return false
    })
    if (!existItem) this.ingredients.push({ name, amount })
  }

  addIngredient(newIngredient: Ingredient) {
    this.checkIngExistence(newIngredient)
    // Update ingredients in ingredients-list Component
    this.ingsEmitter.next([...this.ingredients])
  }

  addIngredients(newIngredients: Ingredient[]) {
    newIngredients.forEach(ingEl => this.checkIngExistence(ingEl))
  }
}
