import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients';
import { IngredientsService } from '../../services/ingredients.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  ingredients: Ingredient[]
  newIngredients: Ingredient[]
  private ingSub: Subscription;
  private selSub: Subscription;
  selectedIng = -1;

  constructor(private ingService: IngredientsService) {
  }

  ngOnInit(): void {
    this.ingSub = this.ingService.ingsEmitter.subscribe(ingredients => this.ingredients = ingredients)
    this.ingService.getIngredients()
    this.newIngredients = this.ingService.newIngredients
    this.selSub = this.ingService.selectedIng.subscribe(selectedIng => this.selectedIng = selectedIng)
  }
  ngOnDestroy() {
    this.ingSub.unsubscribe()
    // this.selSub.unsubscribe()
  }

  editItem(idx: number) {
    this.ingService.selectedIng.next(idx)
    this.selectedIng = idx;
  }

}
