import { Ingredient } from "src/app/models/ingredients";

export class Recipe {
  constructor(public name: string, public description: string, public image: string, public ingredients: Ingredient[] = []) { }
}