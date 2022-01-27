import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public username: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public password: string = "";
  public country: string = "";
  public city: string = "";

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    if (this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/inbox')
    }
  }

  public registerUser(): void {
    const newUser = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      country: this.country,
      city: this.city
    };

    this.usersService.registerUser(newUser).subscribe({
      next: (response: any) => {

        console.log(response.users);

        this.router.navigateByUrl('/home')
      },
      error: (e: any) => {
        this.password = "";

        console.log(e.error.text);
      }
    })
  }
}
