import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { IngredientState, ingredientReducer } from "./ingredients/ingredient.reducer";


export interface AppState {
  ingredients: IngredientState,
  auth: AuthState,
}

export const reducers: ActionReducerMap<AppState> = {
  ingredients: ingredientReducer,
  auth: authReducer
}