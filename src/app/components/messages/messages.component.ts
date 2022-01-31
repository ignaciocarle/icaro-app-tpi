import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    if (!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/home')
    }
  }
}
