import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shared: SharedService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  //METODOS DE USUARIOS
  public logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigateByUrl('/login');
    console.log("Logout exitoso!");
  }

  //////////////////////////////////
  public getUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
