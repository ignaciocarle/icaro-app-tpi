import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public inbox!: Array<Message>;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.inbox = this.messagesService.getInbox()///aca deberia ir un await
  }
}
