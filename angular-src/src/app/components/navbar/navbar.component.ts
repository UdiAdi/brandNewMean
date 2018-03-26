import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  	private validateService : ValidateService, 
  	private authService : AuthService,
  	private router : Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
  	this.authService.logout();
  	//alert("You're logged out!");
  	this.router.navigate(['/home']);
  	return false;
  }
}
