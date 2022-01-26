import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  allUsers: any = [];

  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    const user = {
      username: this.username,
      password: this.password
    };

    this.usersService.login(user).subscribe({
      next: (Response: any) => {
        if (Response.loginSuccesful === true) {
          this.usersService.setCurrentUser(user.username)
          this.router.navigateByUrl('/home')
          console.log(Response.message);
        } else {
          console.log(Response.message);
          this.username = ""
          this.password = ""
        }
      }
    })
  }





  //TESTING
  public testGetUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
