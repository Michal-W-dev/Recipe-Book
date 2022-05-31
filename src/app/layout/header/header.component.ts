import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { selectIsLogged } from 'src/app/state/auth/auth.reducer';
import { AppState } from 'src/app/state/store';
import { FbDataService } from '../../services/fb-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuth$: Observable<boolean>

  constructor(private db: FbDataService, private auth: AuthService, public recipeService: RecipeService, private store: Store<AppState>) {
    this.isAuth$ = this.store.select(selectIsLogged)
  }

  onLogout() {
    this.auth.logout()
  }

  onSaveData() {
    this.db.storeRecipes()
  }

  onFetchData() {
    this.db.fetchRecipes().subscribe()
  }


}
