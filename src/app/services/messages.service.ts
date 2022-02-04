import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../interfaces/messages';

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

  private attemptSendMessage(message: Message): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages`, message);
  }

  //metodos de manejo de datos

  private transformMsg = (msg: Message): Message => {
    const transformedMsg = {
      id: msg.id,
      senderId: this.usersService.getUserById(msg.senderId).username,
      receiverId: this.usersService.getUserById(msg.receiverId).username,
      text: msg.text
    }
    return transformedMsg
  }

  public getMailbox(mailbox: string): Array<Message> {
    const fetched: Array<Message> = []

    const observer = {
      next: (response: any) => {
        response.forEach((element: Message) => {
          fetched.push(this.transformMsg(element))
        });
        console.log("Lista de mensajes desde getInbox()");/////
        console.log(fetched);/////////////////////////////////////////
      },
      error: (e: any) => {
        console.log("ERROR al recuperar los mensajes");
        console.log(e);
      }
    }

    this.fetchMessages(mailbox).subscribe(observer);

    return fetched;
  }
}