import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
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
    this.usersService.registerUser(newUser).subscribe((Response: any) => {//cambiar sintaxis a next/error
      console.log(Response.users);
    },
      error => {
        console.log(error);
      })
  }

  //TESTING
  newUserTest: any = {
    username: "yoda.i.am",
    firstName: "Yoda",
    lastName: "Master",
    password: "wordpass",
    country: "Dagobah",
    city: "unknown"
  }

  public testRegister(): void {
    this.usersService.registerUser(this.newUserTest).subscribe((Response: any) => {
      console.log();
    })
  }

  public testGetUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
