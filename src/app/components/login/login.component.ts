import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public username: String = "";
  public password: String = "";

  allUsers: any = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  public login(): void {
    const user = {
      username: this.username,
      password: this.password
    };
    this.usersService.login(user).subscribe((Response: any) => {
      console.log(Response.message);
    })
  }

  //TESTING
  public testGetUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
