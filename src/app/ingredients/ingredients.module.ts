import { NgModule } from '@angular/core';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'shopping-list', component: IngredientsListComponent },
  { path: 'shopping-list/:name/:amount', component: IngredientsListComponent },
];

@NgModule({
  declarations: [
    IngredientsListComponent,
    IngredientEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class IngredientsModule { }
