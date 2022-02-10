import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //llevar todo esto y el register a reactive forms
  public username: string = "";
  public password: string = "";
  public success: boolean = false;
  public missingInfo: boolean = false;



  constructor(private usersService: UsersService,
    private router: Router) {

    if (!!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/messages/inbox')
    }
  }

  ngOnInit(): void {
  }

  public login(): void {//llevar toda esta logica al servicio de usuarios
    const loggingUser: User = {
      username: this.username,
      password: this.password,
    };

    this.usersService.login(loggingUser).subscribe({
      next: (response: any) => {
        this.success = response.loginSuccesful;
        if (response.loginSuccesful === true) {
          this.usersService.setCurrentUser(loggingUser.username)
          this.router.navigateByUrl('/messages/inbox')
        } else {
          this.password = ""
          alert("Incorrect User or password. Please try again.")
        }
        console.log(response.message);///////////////

      },
      error: (e) => {
        this.missingInfo = true
        alert("Please enter Username and Password.")
        console.log(`ERROR: ${e.error.text}`);/////////////////
      }
    })
  }
}
