import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IngredientsService } from '../../services/ingredients.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredients';
import { observable, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import * as fromRoot from '../../store/app.reducer'
import * as fromRoot from 'src/app/store/app.reducer';
import * as fromIngsActions from '../store/ingredients.actions';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {
  @ViewChild('f', { static: true }) ingForm: NgForm
  // ingredient: Ingredient;
  selectedIngIdx = -1;
  // selectedIngIdx$: Observable<number>;
  edit = false;
  ingredient$: Observable<Ingredient>;
  private selSub: Subscription;

  constructor(private ingrService: IngredientsService, private store: Store<fromRoot.State>, private alertService: AlertService) {
    this.ingredient$ = this.store.select(fromRoot.getActiveIngredient)
    // this.selectedIngIdx$ = this.store.select(fromRoot.getIngredientId)
  }

  ngOnInit(): void {
    this.store.select(fromRoot.getIngredientId).subscribe(id => {
      this.selectedIngIdx = id;
      if (id >= 0) this.edit = true;
    })
    // this.selSub = this.ingrService.selectedIng.subscribe(idx => {
    //   this.selectedIngIdx = idx
    //   this.ingredient = this.ingrService.getIngredient(idx)
    //   this.edit = true;
    // })
  }


  onSubmit(ingForm: NgForm) {
    const amount = +ingForm.value.amount
    const ingredient = { name: ingForm.value.name, amount }
    if (!this.edit) {
      this.store.dispatch(fromIngsActions.addOne({ ingredient }))
      const ingNameTitlecase = ingredient.name[0].toUpperCase() + ingredient.name.slice(1)
      this.alertService.showAlert(`${ingNameTitlecase} were added`, 'success')
    } else {
      this.store.dispatch({ type: '[Ingredients] Edit', ingredient, id: this.selectedIngIdx })
      this.alertService.showAlert(`Ingredient was changed to - ${(ingredient.name)} (${amount})`, 'success')
    }
    this.onClear()
  }

  onClear() {
    // this.ingrService.selectedIng.next(-1)
    this.ingForm.reset()
    this.edit = false;
    this.store.dispatch(fromIngsActions.selectIng({ id: -1 }))
  }

  onDelete() {
    // this.ingrService.deleteIngredient(this.selectedIngIdx);
    this.onClear()
  }

}
