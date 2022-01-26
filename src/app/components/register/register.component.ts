import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public username: String = "";
  public firstName: String = "";
  public lastName: String = "";
  public password: String = "";
  public country: String = "";
  public city: String = "";

  constructor(private usersService: UsersService) { }

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
    this.usersService.registerUser(newUser).subscribe((Response: any) => {
      console.log(Response.users);
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
