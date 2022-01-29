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

  public messagesArray: Array<Object> = []

  constructor(private messages: MessagesService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getMessages();
    if (!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/home')
    }
  }

  private getMessages(): Array<Object> {

    this.messages.getInbox().subscribe({
      next: (response: any) => {
        this.messagesArray = response;
        console.log(response);///////////
      },
      error: (e) => {
        console.log("ERROR");///////////
      }
    });
    return this.messagesArray;
  }
}
