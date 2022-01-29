import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser: string = "";
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();
    /*if (!!this.currentUser) {
      this.router.navigateByUrl('/messages')
    }*/
  }

}
