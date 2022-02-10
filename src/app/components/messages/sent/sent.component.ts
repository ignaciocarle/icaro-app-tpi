import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MailboxCollection, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-sent',
  template: '<app-msg-list [identifier]="identifier"> </app-msg-list>',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  identifier: keyof MailboxCollection = "sent";

  constructor() { }

  ngOnInit(): void {
  }
}
