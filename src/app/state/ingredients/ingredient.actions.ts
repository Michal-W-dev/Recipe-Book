import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/models/ingredients";


export const addOne = createAction('[Shopping-list page] Add', props<{ ingredient: Ingredient }>())
export const addMany = createAction('[Shopping-list page] Add many', props<{ ingredients: Ingredient[] }>())
export const selectIng = createAction('[Shopping-list page] Select', props<{ id: number }>())
export const update = createAction('[Shopping-list page] Edit', props<{ ingredient: Ingredient, id: number }>())
export const deleteById = createAction('[Shopping-list page] Delete', props<{ id: number }>())
