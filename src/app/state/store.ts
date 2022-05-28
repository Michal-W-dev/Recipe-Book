import { ActionReducerMap } from "@ngrx/store";
import { IngredientState, ingredientReducer } from "./ingredients/ingredient.reducer";



export interface AppState {
  ingredients: IngredientState
}

export const reducers: ActionReducerMap<AppState> = {
  ingredients: ingredientReducer,
}