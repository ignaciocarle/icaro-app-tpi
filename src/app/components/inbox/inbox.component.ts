import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

import { Box, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public box: Box = {
    identifier: "inbox",
    data: []
  }

  constructor(private messagesService: MessagesService) {
    this.box.data = this.messagesService.getMailbox(this.box.identifier)
  }

  ngOnInit(): void {
  }

  public refresh(): void {
    this.box.data = this.messagesService.getMailbox(this.box.identifier)
  }
}
