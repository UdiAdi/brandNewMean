import { Component, OnInit } from '@angular/core';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	
	name : String;
	username : String;
	email : String;
	password : String;
	faaltu : String;

  constructor(
  	
  	private validateService : ValidateService, 
  	private authService : AuthService,
  	private router : Router

  	) { } 
  	

  ngOnInit() {
  	if(this.authService.loggedIn()){
      this.router.navigate(['/profile']);
    }
  }

  	onRegisterSubmit(){

	  	const user = {
	  	name : this.name,
	  	email : this.email,
	  	username : this.username,
	  	password : this.password,
	  	faaltu : this.faaltu
	  	}

	  	//check for required fields
	  	if(!this.validateService.validateRegister(user)){
	  		
	  		alert('fill all fields');

	  		return false;
	  	}

	  	//valid email
	  	if(!this.validateService.validateEmail(user.email)){
	  		
	  		alert('please fill in correct email');

	  		return false;	
	  	}

	  	//finally register
	  	this.authService.registerUser(user).subscribe(data => {
	  		if(data.success){

	  			alert('Successfully registered!!! Yayyy!!!');
	  			
	  			this.router.navigate(['/login']);
	  		}
	  		else{
	  			
	  			alert('Oops, user already registered!!! Yayyy???');

	  			this.router.navigate(['/register']);
	  		}
	  	});

	}

}
