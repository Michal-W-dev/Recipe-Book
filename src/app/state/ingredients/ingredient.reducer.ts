import { createReducer, createSelector, on } from '@ngrx/store';
import { Ingredient } from "src/app/models/ingredients";
import { AppState } from '../store';
import { addMany, selectIng, update } from './ingredient.actions';
import * as IngActions from './ingredient.actions'


export interface IngredientState {
  ingredients: Ingredient[],
  id: number
}
const initialState: IngredientState = {
  ingredients: [new Ingredient('apples', 5), new Ingredient('oranges', 7), new Ingredient('olive', 7)],
  id: -1
}


const addItemsToIngredients = (ingredients: Ingredient[], newItems: Ingredient[]) => {
  const updatedIngredients: Ingredient[] = [...ingredients]
  newItems.forEach((newEl) => {
    const itemExist = updatedIngredients.find(({ name, amount }, idx) => {
      if (name.toLowerCase() === newEl.name.toLowerCase()) {
        updatedIngredients[idx] = { name, amount: newEl.amount + amount }
        return true
      } else return false
    })
    if (!itemExist) updatedIngredients.push(newEl)
  })
  return updatedIngredients
}


export const ingredientReducer = createReducer(
  initialState,
  on(IngActions.addOne, (state, { ingredient }) => {
    const updatedIngredients = addItemsToIngredients(state.ingredients, [ingredient])
    return { ...state, ingredients: updatedIngredients }
  }),
  on(addMany, (state, { ingredients }) => {
    const updatedIngredients = addItemsToIngredients(state.ingredients, ingredients)
    return ({ ...state, ingredients: updatedIngredients })
  }),
  on(selectIng, (state, { id }) => ({ ...state, id })),
  on(update, (state, { ingredient, id }) => {
    const clonedIngredients = [...state.ingredients]
    clonedIngredients[id] = ingredient

    return { id, ingredients: clonedIngredients }
  }),
  on(IngActions.deleteById, (state, { id }) => {
    const updatedIngredients = state.ingredients.filter((_, i) => id !== i)
    return { ...state, ingredients: updatedIngredients }
  })
)

const selectIngReducer = (state: AppState) => state.ingredients

export const selectAllIngredients = createSelector(selectIngReducer, ({ ingredients }) => ingredients)
export const selectId = createSelector(selectIngReducer, ({ id }) => id)
export const selectIngredient = createSelector(selectAllIngredients, selectId,
  (ingredients, id) => ingredients[id]
)
