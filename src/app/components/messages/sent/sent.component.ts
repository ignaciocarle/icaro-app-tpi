import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Mailbox } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public box: Mailbox = {
    identifier: "sent"
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
