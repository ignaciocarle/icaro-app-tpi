import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shared: SharedService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser();
  }

  //METODOS DE USUARIOS
  public logout(): void {
    this.usersService.clearCurrentUser();
    console.log("Logout exitoso!");//////////
    this.router.navigateByUrl('/login');
  }

  //////////////////////////////////
  public testGetUsers(): void {
    this.usersService.getUsers();
  }
}