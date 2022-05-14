import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIngs from '../ingredients/store/ingredients.reducer'

export interface State {
  ings: fromIngs.State;
}

export const reducers: ActionReducerMap<State> = {
  ings: fromIngs.ingredientsReducer,
}


const getIngredientsState = createFeatureSelector<fromIngs.State>('ings')

// export const getIngredients = createSelector(getIngredientsState, (ingState) => ingState.ingredients)
// export const getIngredients = createSelector(getIngredientsState, (ingState) => fromIngs.getIngredients(ingState))
export const getIngredients = createSelector(getIngredientsState, fromIngs.selectAll)
export const getIngredientId = createSelector(getIngredientsState, fromIngs.selectId)
export const getActiveIngredient = createSelector(getIngredientsState, fromIngs.selectActive)
