import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simform Practicle App';
  loginStatus = false;
  constructor(private apiService: ApiService) {
    this.loginStatus = apiService.getIsLoggedIn()
  }
}
