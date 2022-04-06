import { Ingredient } from "src/shared-models/ingredients";

export class Recipe {
  constructor(public name: string, public description: string, public image: string, public ingredients: Ingredient[] = []) { }
}