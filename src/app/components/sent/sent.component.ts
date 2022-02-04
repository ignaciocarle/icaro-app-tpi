import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Box, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public box: Box = {
    identifier: "sent",
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
