import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Messages } from '../interfaces/messages';

import { SharedService } from './shared.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public messagesArray: Array<Object> = []

  constructor(private http: HttpClient, private sharedService: SharedService, private usersService: UsersService) { }

  public getInbox(): Observable<any> {////////pasar a privado y armar el getmessages aca
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.currentUser}/messages/inbox`);
  }

  public getSent(): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/sent`);
  }

  public sendMessage(message: Messages): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/sent`, message);
  }

}
