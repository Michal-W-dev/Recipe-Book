import * as fromRecipes from './recipes.actions';

describe('recipesRecipess', () => {
  it('should return an action', () => {
    expect(fromRecipes.recipesRecipess().type).toBe('[Recipes] Recipes Recipess');
  });
});
