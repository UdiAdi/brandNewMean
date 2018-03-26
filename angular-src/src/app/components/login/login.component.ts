import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {FlashMessageModule} from 'angular-flash-message';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username : String;
	password : String;

  constructor(
    private validateService : ValidateService, 
  	private authService : AuthService,
  	private router : Router

    ) { }

    //private flashMessage : FlashMessageModule ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	const user = {
	  	username : this.username,
	  	password : this.password
  	}

  	//check for required fields
	  	if(!this.validateService.validateLogin(user)){
	  		//console.log('please fill in all fields');
	  		
	  		alert('fill all fields');

	  		//this.flashMessage.show("please fill in all fields", {cssClass : 'alert-danger', timeout : 2000});
	  		return false;
	  	}


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

  }
}
