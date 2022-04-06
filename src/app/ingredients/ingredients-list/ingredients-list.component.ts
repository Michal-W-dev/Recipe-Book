import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared-models/ingredients';
import { IngredientsService } from '../ingredients.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  ingredients: Ingredient[]
  private ingSub: Subscription;
  constructor(private ingService: IngredientsService) {

  }

  ngOnInit(): void {
    this.ingSub = this.ingService.ingsEmitter.subscribe(ingredients => this.ingredients = ingredients)
    this.ingService.getIngredients()
  }
  ngOnDestroy() { this.ingSub.unsubscribe() }
}
