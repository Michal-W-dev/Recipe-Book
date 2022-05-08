import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { FbDataService } from '../../services/fb-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private db: FbDataService, private auth: AuthService, public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
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

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
