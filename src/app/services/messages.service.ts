import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message, NewMessage } from '../interfaces/messages';

import { SharedService } from './shared.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private sharedService: SharedService, private usersService: UsersService) { }

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

  private transformMessage = (msg: Message): Message => {
    const transformedMessage: Message = {
      id: msg.id,
      senderId: this.usersService.getUserById(msg.senderId),
      receiverId: this.usersService.getUserById(msg.receiverId),
      text: msg.text
    }
    return transformedMessage
  }

  //metodos publicos

  public getMailbox(mailbox: string): Message[] {
    const fetched: Message[] = []
    const observer = {
      next: (response: any) => {
        response.forEach((element: Message) => {
          fetched.push(this.transformMessage(element))
        });
        //console.log(`Lista de mensajes %c"${mailbox}"%c desde getMailbox`, "color:red;", "");/////
        //console.log(fetched);/////////////////////////////////////////
      },
      error: (e: any) => {
        console.log("ERROR al recuperar los mensajes");
        console.log(e);
      }
    }

    this.fetchMessages(mailbox).subscribe(observer);
    return fetched;
  }

  public deleteMessage(messageId: string): void {
    this.attemptDeleteMessage(messageId)
  }
}
