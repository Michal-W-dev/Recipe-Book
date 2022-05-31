import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IngredientsService } from '../../services/ingredients.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredients';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromIngActions from 'src/app/state/ingredients/ingredient.actions';
import { AlertService } from 'src/app/services/alert.service';
import { AppState } from 'src/app/state/store';
import * as fromIngReducer from 'src/app/state/ingredients/ingredient.reducer';


@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) ingForm: NgForm
  selectedIngIdx = -1;
  edit = false;
  subSelectedIngIdx: Subscription;
  ingredient$: Observable<Ingredient>;
  ingredients$: Observable<Ingredient[]>;

  constructor(private ingrService: IngredientsService, private store: Store<AppState>, private alertService: AlertService) {
    this.ingredient$ = this.store.select(fromIngReducer.selectIngredient)
    this.ingredients$ = this.store.select(fromIngReducer.selectAllIngredients)
  }

  ngOnInit(): void {
    this.subSelectedIngIdx = this.store.select(fromIngReducer.selectId).subscribe(id => {
      this.selectedIngIdx = id;
      if (id >= 0) this.edit = true;
    })
  }

  async onSubmit(ingForm: NgForm) {
    const amount = +ingForm.value.amount;
    const ingredient = { name: ingForm.value.name as string, amount };

    if (!this.edit) {
      this.store.dispatch(fromIngActions.addOne({ ingredient }))
      this.ingrService.addIngredientAlert(ingredient.name)
    } else {
      const prevIngredient = await firstValueFrom(this.ingredient$)
      this.store.dispatch(fromIngActions.update({ ingredient, id: this.selectedIngIdx }))
      this.ingrService.editIngredientAlert(ingredient, prevIngredient)
    }
    this.onClear()
  }

  onClear() {
    this.ingForm.reset()
    this.edit = false;
    this.store.dispatch(fromIngActions.selectIng({ id: -1 }))
  }

  onDelete() {
    this.store.dispatch(fromIngActions.deleteById({ id: this.selectedIngIdx }))
    this.alertService.showAlert('Ingredient was deleted', 'danger')
    this.onClear()
  }

  ngOnDestroy(): void {
    this.subSelectedIngIdx.unsubscribe()
  }
}
