import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  // loggedInUser: string;
  showRegister: boolean;
  constructor(private apiService: ApiService, private router: Router) { 
    this.apiService.callInNavigation$.subscribe(
      () => {
        alert('Welcome To My Website: '+localStorage.getItem('email') );
        this.isLoggedIn = true;
      }
    );
  }

  ngOnInit() {
    this.isLoggedIn = this.apiService.getIsLoggedIn()
  }

  

onLogoutClick() {
  this.apiService.setLoggedIn(false);
  alert("You Are Logged Out Now!!!");
  this.router.navigate(['/login']);
}


ngOnChanges() {
  this.isLoggedIn = true;
}
}
