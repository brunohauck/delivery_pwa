import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { TokenReturn } from '../models/user/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  token : TokenReturn;
  constructor(
    private  userService:  UserService, 
    private  router:  Router) { }

  ngOnInit() {
  }
  login(form){
    var postData = {
      grant_type: "password",
      client_id: 6,   // the client ID generate before
      client_secret: "HYkLZxruTZ40dXVUqwxNxWK4z3IOyjh9QTvD4nry",   // the client secret generated before
      username: form.value.email, // an User in Laravel database
      password: form.value.password // the user's password
    }
    this.userService.login(postData).subscribe((res)=>{
      if(res==undefined){
        console.log("Error")
      }else{
        this.token = res;
        sessionStorage.setItem("token", JSON.stringify(this.token));
        sessionStorage.setItem("flagLogado", "sim");
        this.router.navigateByUrl('home');
      }
      
    },
    (err) => {console.log(err)}
    );
  }

}
