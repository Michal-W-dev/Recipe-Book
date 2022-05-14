import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/models/ingredients";


export const addOne = createAction('[Ingredients] Add', props<{ ingredient: Ingredient }>())
export const addMany = createAction('[Ingredients] Add', props<{ ingredients: Ingredient[] }>())
export const selectIng = createAction('[Ingredients] Select', props<{ id: number }>())
export const edit = createAction('[Ingredients] Edit', props<{ ingredient: Ingredient, id: number }>())







// import { Action } from "@ngrx/store";
// import { Ingredient } from "src/app/models/ingredients";

// export const ADD_INGREDIENT = 'ADD_INGREDIENT'

// export class AddIngredient implements Action {
//   readonly type = 'ADD_INGREDIENT';
//   constructor(public pyaload:Ingredient){}
// }
