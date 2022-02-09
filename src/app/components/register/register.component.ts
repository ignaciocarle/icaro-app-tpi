import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/users';

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

  constructor(private usersService: UsersService,
    private router: Router) {
    if (!!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/messages')
    }
  }

  ngOnInit(): void {
  }

  public registerUser(): void {//llevar toda esta logica al servicio de usuarios
    const User: User = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      country: this.country,
      city: this.city
    };

    this.usersService.registerUser(User).subscribe({
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
