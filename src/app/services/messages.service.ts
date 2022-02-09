import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mailbox, Message, NewMessage } from '../interfaces/messages';

import { SharedService } from './shared.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private mailboxes!: Mailbox[]

  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private usersService: UsersService) { }

  //metodos de solicitud a la API
  private fetchMessages(mailbox: string): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/${mailbox}`);
  }

  private attemptSendMessage(message: NewMessage): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages`, message);
  }

  private attemptDeleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/${messageId}`)
  }

  //metodos de manejo de datos

  private transformMessage(msg: Message): Message {
    const transformedMessage: Message = {
      id: msg.id,
      senderId: this.usersService.getUserById(msg.senderId),
      receiverId: this.usersService.getUserById(msg.receiverId),
      text: msg.text
    }
    return transformedMessage
  }

  private getBoxId(identifier: string) {
    return this.mailboxes.findIndex((x) => x.identifier === identifier)
  }

  private setMailbox(identifier: string): void {
    let fetched: Mailbox[] = [{
      identifier: "inbox",
      data: []
    }, {
      identifier: "sent",
      data: []
    }]
    const observer = {
      next: (response: any) => {
        response.forEach((element: Message) => {
          fetched[this.getBoxId(identifier)].data.push(this.transformMessage(element))
        });
        //console.log(`Lista de mensajes %c"${identifier}"%c desde setMailbox`, "color:red;", "");/////
        //console.log(fetched[this.getBoxId(identifier)].data);/////////////////////////////////////////
      },
      error: (e: any) => {
        console.log(`ERROR al recuperar los mensajes de ${identifier}`);
        console.log(e);
      }
    }

    this.fetchMessages(identifier).subscribe(observer);
    this.mailboxes = fetched
  }

  //metodos publicos

  public getMailbox(identifier: string): Message[] {
    this.setMailbox(identifier)
    return this.mailboxes[this.getBoxId(identifier)].data;
  }

  public sendMessage(newMsg: NewMessage): void {
    this.attemptSendMessage(newMsg).subscribe((response) => {
      console.log("Mensaje enviado");
      console.log(response);
    })
  }

  public deleteMessage(messageId: string): void {
    this.attemptDeleteMessage(messageId)
  }
}
