import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

import { Mailbox } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public box: Mailbox = {
    identifier: "inbox"
  }

  constructor(private messagesService: MessagesService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  public refresh(): void {
    this.box.data = this.messagesService.getMailbox(this.box.identifier);
  }
}
