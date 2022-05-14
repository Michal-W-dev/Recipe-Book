import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients';
import { IngredientsService } from '../../services/ingredients.service';
import * as fromStore from '../store/ingredients.reducer'
import * as fromIngAction from '../store/ingredients.actions'
import * as fromRoot from '../../store/app.reducer'




@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  // ingredients: Ingredient[]
  // ingredients$: Observable<{ ingredients: Ingredient[] }>
  ingredients$: Observable<Ingredient[]>
  selectedIng$: Observable<number | null>
  newIngredients: Ingredient[]
  private ingSub: Subscription;
  private selSub: Subscription;
  // selectedIng = -1;

  // constructor(private ingService: IngredientsService, private store: Store<{ ings: fromStore.State }>) {
  constructor(private ingService: IngredientsService, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    // this.store.subscribe(state => console.log(state));
    // this.ingredients$ = this.store.pipe(map(state => state.ings.ingredients))
    this.ingredients$ = this.store.select(fromRoot.getIngredients)
    this.selectedIng$ = this.store.select(fromRoot.getIngredientId)
    // this.ingredients$ = this.store.select('ings').pipe(map(state => state.ingredients))
    // this.ingredients$ = this.store.select('ings')
    // this.ingSub = this.ingService.ingsEmitter.subscribe(ingredients => this.ingredients = ingredients)
    // this.ingService.getIngredients()
    // this.newIngredients = this.ingService.newIngredients
    // this.selSub = this.ingService.selectedIng.subscribe(selectedIng => this.selectedIng = selectedIng)
  }
  ngOnDestroy() {
    // this.ingSub.unsubscribe()
    // this.selSub.unsubscribe()
  }

  editItem(idx: number) {
    // this.ingService.selectedIng.next(idx)
    // this.selectedIng = idx;
    // this.store.dispatch({ type: '[Ingredients] Select', id: idx })
    this.store.dispatch(fromIngAction.selectIng({ id: idx }))
  }

}
