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
  public success: boolean = false;
  public missingInfo: boolean = false;


  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    if (this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/inbox')
    }
  }

  public login(): void {
    const user = {
      username: this.username,
      password: this.password
    };

    this.usersService.login(user).subscribe({
      next: (response: any) => {
        this.success = response.loginSuccesful;
        if (response.loginSuccesful === true) {
          this.usersService.setCurrentUser(user.username)
          this.router.navigateByUrl('/home')
        } else {
          this.password = ""
          alert("Incorrect User or password. Please try again.")
        }
        console.log(response.message);

      },
      error: (e) => {
        this.missingInfo = true
        alert("Please enter Username and Password.")
        console.log(`ERROR: ${e.error.text}`);
      }
    })
  }
}
