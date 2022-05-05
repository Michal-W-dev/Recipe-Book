import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/ingredients';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('input') inputs: QueryList<ElementRef>;
  recipe: Recipe;
  isEdited = false;
  recipeForm: FormGroup;
  subInputchanges: Subscription;
  recipeIdx: number;
  selectedIngGroupIdx: number;

  constructor(public recipeService: RecipeService, private route: ActivatedRoute, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = +params['id']
      if (this.recipeIdx >= 0) {
        this.isEdited = true
        this.recipe = this.recipeService.getRecipe(this.recipeIdx)
      }
      else {
        this.isEdited = false
        this.recipe = new Recipe('', '', '', [new Ingredient('', 0)]);
      }
    })
    if (this.recipe) this.initForm()
  }

  ngAfterViewInit() {
    // Focus first input
    this.inputs.first.nativeElement.focus()
    // Focus added ingredient (or focus last but one input when removed ingredient)
    this.subInputchanges = this.inputs.changes.subscribe(_ => {
      const inputsLength = this.inputs.length
      if (inputsLength >= 2) this.inputs.toArray()[inputsLength - 2].nativeElement.focus()
    })
  };

  ngOnDestroy() { this.subInputchanges.unsubscribe(); }


  private initForm() {
    const recipeGroup = {
      'name': new FormControl(this.recipe.name, Validators.required),
      'description': new FormControl(this.recipe.description, Validators.required),
      'image': new FormControl(this.recipe.image, Validators.required),
    }

    const ingGroup = this.recipe.ingredients.map(ing => new FormGroup({
      'name': new FormControl(ing.name, Validators.required),
      'amount': new FormControl(ing.amount || '', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))

    this.recipeForm = new FormGroup({
      'recipeGroup': new FormGroup(recipeGroup),
      'ingArray': new FormArray(ingGroup),
    });
  }

  onDeleteIngredient() {
    this.formArray.removeAt(this.selectedIngGroupIdx)
    this.selectedIngGroupIdx = this.formArray.controls.length - 1
    this.recipeForm.markAsDirty()
    this.alertService.showAlert('Ingredients were deleted.', 'danger')
  }

  onAddIngredient() {
    const groupControl = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    this.formArray.push(groupControl)
    // Select new groupControl
    const groupLength = this.formArray.controls.length
    this.selectedIngGroupIdx = groupLength - 1
  }

  get formArray() { return this.recipeForm.get('ingArray') as FormArray }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe = { ...this.recipeForm.value.recipeGroup, ingredients: this.recipeForm.value.ingArray }
      if (this.isEdited) {
        if (!this.recipeForm.dirty) this.alertService.showAlert('The form was not changed')
        else this.recipeService.editRecipe(this.recipeIdx, recipe)
        // Navigate to edited recipe
        this.router.navigate(['/recipes', this.recipeIdx])
      } else {
        this.recipeService.addRecipe(recipe)
        // Navigate to last recipe (recently added)
        const lastIndex = this.recipeService.getRecipes.length - 1
        this.router.navigate(['/recipes', lastIndex])
      }
    }
    else {
      // For invalid form send alert
      const alert = (msg: string) => this.alertService.showAlert(msg, 'danger')
      // Find invalid (ingredient groupInput)
      const ingGroupControl = this.formArray.controls.find(groupControl => groupControl.invalid);

      // Show errors on alert
      ['name', 'amount'].forEach(el => ingGroupControl?.get(el)?.hasError('required') && alert(`${el} is required.`))
      if (ingGroupControl?.get('amount')?.hasError('pattern')) alert('Amount must be number')

      // Recipe group
      const recipeGroup = this.recipeForm.get('recipeGroup')
      if (recipeGroup?.invalid) {
        ['name', 'description', 'image'].forEach(el => recipeGroup?.get(el)?.hasError('required') && alert(`${el} is required.`))
      }
    }
  }

  // keysToArray(obj: Ingredient) { return Object.keys(obj) }

  onSelectGroup(id: number) { this.selectedIngGroupIdx = id }
}
