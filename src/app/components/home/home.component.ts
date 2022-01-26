import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
  }

}
