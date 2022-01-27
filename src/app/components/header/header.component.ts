import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  //METODOS DE USUARIOS
  public logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigateByUrl('/login')
  }

  public getCurrentUser(): string {
    return this.usersService.getCurrentUser()
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      console.log(data);
    });
  }

}
