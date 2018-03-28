import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   sname : String;


  constructor(
  	private validateService : ValidateService, 
  	private authService : AuthService,
  	private router : Router,
    private http : Http
  ) { }

  ngOnInit() {
  }

  
/*
  this.authService.authenticateUser(user).subscribe(data => {
      //console.log(data);

      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/profile']);
      }
      else{
        //flash msg here
        alert('unsuccessful ' + data.msg);
        this.router.navigate(['/login']);
      }

    });
*/

  onLogoutClick(){
    this.authService.logout();
    //alert("You're logged out!");
    this.router.navigate(['/']);
    return false;
  }

  }





