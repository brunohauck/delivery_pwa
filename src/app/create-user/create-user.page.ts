import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { UserService } from '../login/user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  constructor(
    private  userService:  UserService, 
    private  router:  Router) { }

  ngOnInit() {
  }
  register(form) {
    this.userService.createUser(form.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('home');
    });
  }
}
