// import * as IngredientActions from "./ingredients.actions";
// import { AddIngredient, ADD_INGREDIENT } from "./ingredients.actions";
import { state } from "@angular/animations";
import { createReducer, createSelector, on } from "@ngrx/store";
import { Ingredient } from "src/app/models/ingredients";
import { addOne, addMany, selectIng, edit } from "./ingredients.actions";

export interface State {
  ingredients: Ingredient[],
  id: number
}


const initialState: State = {
  ingredients: [new Ingredient('apples', 5), new Ingredient('oranges', 7), new Ingredient('olive', 7)],
  id: -1
}

export const ingredientsReducer = createReducer(
  initialState,
  on(addOne, (state, { ingredient }) => ({ ...state, ingredients: [...state.ingredients, ingredient] })),
  on(addMany, (state, { ingredients }) => ({ ...state, ingredients: [...state.ingredients, ...ingredients] })),
  on(selectIng, (state, { id }) => ({ ...state, id })),
  on(edit, (state, { ingredient, id }) => {
    const clonedIngredients = state.ingredients.slice()
    clonedIngredients[id] = ingredient

    return { id, ingredients: clonedIngredients }
  })
)

export const selectAll = (state: State) => state.ingredients
export const selectId = (state: State) => state.id
export const selectActive = createSelector(
  selectAll, selectId, (ingredients, activeId) => ingredients[activeId]
)






// export function ingredientsReducer(state = initialState, action: IngredientActions.AddIngredient) {
//   switch (action.type) {
//     case IngredientActions.ADD_INGREDIENT: {
//       // case ADD_INGREDIENT: {
//       return { ...state, ingredients: [...state.ingredients, action.paylaod!] }
//     }
//     default: return state;
//   }
// }

