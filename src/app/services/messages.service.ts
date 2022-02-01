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

  private inbox: Array<Message> = this.setInbox();

  constructor(private http: HttpClient, private sharedService: SharedService, private usersService: UsersService) { }


  //metodos de solicitud a la API
  private fetchInbox(): Observable<any> {////////pasar a privado y armar el getmessages aca
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/inbox`);
  }

  private fetchSent(): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/sent`);
  }

  private sendMessage(message: Message): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages`, message);
  }

  //metodos de manejo de datos
  private transformMessages(msg: Message) {
    const transformedMsg: Message = {
      id: msg.id,
      senderId: this.usersService.getUserById(msg.senderId).username,
      receiverId: this.usersService.getUserById(msg.receiverId).username,
      text: msg.text
    }
    return transformedMsg
  }

  private setInbox(): Array<Message> {
    const fetchedMessages: Array<Message> = [];

    this.fetchInbox().subscribe({
      next: (response: any) => {
        response.forEach((element: Message) => {
          fetchedMessages.push(this.transformMessages(element))
        });
        this.inbox = fetchedMessages;
        console.log("Lista de mensajes desde setInbox");/////
        console.log(response);/////////////////////////////////////////
      },
      error: (e) => {
        console.log("ERROR al recuperar los mensajes");
        console.log(e);
      }
    });
    return fetchedMessages;
  }

  //metodos publicos de acceso a los datos
  public getInbox(): Array<Message> {
    return this.inbox
  }
}
