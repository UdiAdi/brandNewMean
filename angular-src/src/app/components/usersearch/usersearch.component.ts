import { Component, OnInit } from '@angular/core';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

// import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css']
})
export class UsersearchComponent implements OnInit {

	
   sname : String;

   user : {
   	name : String,
   	username : String
   }

  constructor(

  	private validateService : ValidateService, 
  	private authService : AuthService,
  	private router : Router,
  	private http : Http,

  	) { }



ngOnInit() {

	// this.authService.getProfile().subscribe(profile => {
	//   		this.user = profile.user;
	//   	},
	//   		err => {
	//   		alert(err);
	//   		return false;
	//   	}
//  	);
//  }

  		
}

displayUsers(){
    const squery = this.sname;
    
    //check if empty string
    if(squery == undefined){
      alert('Fill in something to search');
      return false;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // udit deploy
	////////////////////////////////////////////////////

    //this.http.post('http://localhost:3000/users/usersearch/:id', 
    this.http.post('users/usersearch/:id', 

    ////////////////////////////////////////////////////
      {srch : squery}, {headers : headers}).map(res => res.json()).subscribe(data => {


        if(data.success){
          console.log('data success!!');
          //console.log(data.userrr.username);
          
          if(localStorage.getItem('user') != null){

            const usr = JSON.parse(localStorage.getItem('user')).username;
          
            //if found user id currently logged in, show his/her own profile

            if(usr == squery){
              this.router.navigate(['/profile']);
            }

            else{
              const idd = data.userrr.id;

              this.user = data.userrr;

              //console.log('/usersearch/' + idd);
              //this.router.navigate(['/usersearch', idd]);
            }


          }

          else{
              const idd = data.userrr.id;

              this.user = data.userrr;
              
              //console.log('/usersearch/' + idd);
              //this.router.navigate(['/usersearch', idd]);
            }
          

        }
        else{
          console.log('data unsuccessful!!');
          alert('no user found');
          //this.router.navigate(['/']);
        }


      });


}






}





  	

  	


  

