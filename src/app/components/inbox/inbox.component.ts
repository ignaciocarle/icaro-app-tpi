import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/messages';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public inbox!: Array<Message>

  constructor(private messagesService: MessagesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers();
    this.renderInbox();
  }

  private renderInbox(): void {
    const fetchedMessages: Array<Message> = [];

    this.messagesService.getInbox().subscribe({
      next: (response: any) => {
        console.log(response);/////////////////////////////////////////
        response.forEach((element: Message) => {
          const message: Message = {
            id: element.id,
            senderId: this.usersService.getUserById(element.senderId).username,
            receiverId: this.usersService.getUserById(element.receiverId).username,
            text: element.text
          }
          fetchedMessages.push(message)
        });
        this.inbox = fetchedMessages;
      },

      error: (e) => {
        console.log("ERROR al recuperar los mensajes");
      }
    });
  }

  /////////////////////////////////////////////////////
  public test(): void {
    console.log(
      this.usersService.getUserById("1").username
    );
  }
}
