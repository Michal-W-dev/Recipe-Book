import { createAction, props } from '@ngrx/store';

export const recipes = createAction(
  '[Recipes] Recipes'
);

export const recipesSuccess = createAction(
  '[Recipes] Recipes Success',
  props<{ data: any }>()
);

export const recipesFailure = createAction(
  '[Recipes] Recipes Failure',
  props<{ error: any }>()
);
