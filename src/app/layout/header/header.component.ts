import { Component, OnInit } from '@angular/core';
import { FbDataService } from '../../services/fb-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private db: FbDataService) { }

  ngOnInit(): void { }

  onSaveData() {
    this.db.storeRecipes()
  }

  onFetchData() {
    this.db.fetchRecipes().subscribe()
  }

}
