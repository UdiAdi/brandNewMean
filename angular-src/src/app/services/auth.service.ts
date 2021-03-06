import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {

	authToken : any;
	user : any;


  	constructor(private http : Http, private router : Router) { }

	  registerUser(user){
	  	let headers = new Headers();
	  	headers.append('Content-Type', 'application/json');
	  	
	  	// udit deploy
	  	////////////////////////////////////////////////////
	  	
	  	//return this.http.post('http://localhost:3000/users/register', user, {headers : headers}).map(res => res.json());
	  	return this.http.post('users/register', user, {headers : headers}).map(res => res.json());

	  	////////////////////////////////////////////////////

	  }

	  getProfile(){
		let headers = new Headers();
		this.loadToken();
	  	headers.append('Authorization', this.authToken);
	  	headers.append('Content-Type', 'application/json');
	  	
	  	// udit deploy
	  	////////////////////////////////////////////////////

	  	//return this.http.get('http://localhost:3000/users/profile', {headers : headers}).map(res => res.json());  
	  	return this.http.get('users/profile', {headers : headers}).map(res => res.json());  

	  	////////////////////////////////////////////////////
	  }

	  loadToken(){
	  const token = localStorage.getItem('id_token');
	  this.authToken = token;
	  }

	  authenticateUser(user){
	  	let headers = new Headers();
	  	headers.append('Content-Type', 'application/json');

	  	// udit deploy
	  	////////////////////////////////////////////////////

	  	//return this.http.post('http://localhost:3000/users/authenticate', user, {headers : headers}).map(res => res.json());
	  	return this.http.post('users/authenticate', user, {headers : headers}).map(res => res.json());

	  	////////////////////////////////////////////////////

	  }


/*
	  srchUsr(squery){
	  	console.log('srchUsr for ' + squery);

	  	let headers = new Headers();
	  	headers.append('Content-Type', 'application/json');

	  	console.log('udit ' + this.http.post('http://localhost:3000/users/usersearch', squery, {headers : headers}).map(res => res.json()));
	  	
	  	return this.http.post('http://localhost:3000/users/usersearch', squery, {headers : headers}).map(res => res.json());
	  }
*/


	  storeUserData(token, user){
	  	localStorage.setItem('id_token', token);
	  	localStorage.setItem('user', JSON.stringify(user));
	  	this.authToken = token;
	  	this.user = user;
	  }

	  loggedIn(){
	  //console.log('Token (id_token) is ' + this.authToken + '   tokenNotExpired() is ' + tokenNotExpired());
	  return tokenNotExpired('id_token');
	  }

	  logout(){
	  	this.authToken = null;
	  	this.user = null;
	  	localStorage.clear();
	  }

}
