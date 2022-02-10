import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MailboxCollection, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public identifier: keyof MailboxCollection = "sent";


  constructor(public messagesService: MessagesService) {

    this.refresh();
  }

  ngOnInit(): void {
  }

  public refresh(): void {
    this.messagesService.refresh(this.identifier);
  }

  public deleteMessage(id: string): void {
    this.messagesService.deleteMessage(id as keyof Message, this.identifier)
  }
}
