import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MailboxCollection, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-inbox',
  template: '<app-msg-list [identifier]="identifier"> </app-msg-list>',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public identifier: keyof MailboxCollection = "inbox";

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }
}
