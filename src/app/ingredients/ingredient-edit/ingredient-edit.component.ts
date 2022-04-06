import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/shared-models/ingredients';
import { IngredientsService } from '../ingredients.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {
  @Output() addIngredient = new EventEmitter<Ingredient>()
  // @ViewChild('nameInput', { static: true }) nameInput: ElementRef
  name = '';
  amount = '';
  alert = '';
  paramsSubscription: Subscription;
  constructor(private ingrService: IngredientsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.name = params['name']
      this.amount = params['amount']
    })
  }


  onSubmit() {
    const amount = +this.amount
    if (amount > 0) {
      const ingredient = { name: this.name, amount }
      this.ingrService.addIngredient(ingredient)
    } else {
      this.alert = "Amount must be a number greater than 0."
    }
  }


}
