import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { EffectsModule } from '@ngrx/effects';
// import { RecipesEffects } from './store/recipes.effects';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    // EffectsModule.forFeature([RecipesEffects])
  ],
})
export class RecipesModule { }
