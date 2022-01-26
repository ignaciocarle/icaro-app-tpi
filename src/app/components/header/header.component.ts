import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigateByUrl('/login')
  }

}
