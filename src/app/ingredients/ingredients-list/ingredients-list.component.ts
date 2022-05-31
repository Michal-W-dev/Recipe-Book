import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients';
import * as fromIngReducer from 'src/app/state/ingredients/ingredient.reducer';
import * as fromIngActions from 'src/app/state/ingredients/ingredient.actions';
import { AppState } from 'src/app/state/store';


@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsListComponent {
  ingredients$: Observable<Ingredient[]>
  selectedIng$: Observable<number | null>

  constructor(private store: Store<AppState>) {
    this.ingredients$ = this.store.select(fromIngReducer.selectAllIngredients)
    this.selectedIng$ = this.store.select(fromIngReducer.selectId)
  }

  editItem(idx: number) {
    this.store.dispatch(fromIngActions.selectIng({ id: idx }))
  }

}
