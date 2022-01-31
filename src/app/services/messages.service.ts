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

  public getInbox(): Observable<any> {////////pasar a privado y armar el getmessages aca
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/inbox`);
  }

  public getSent(): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/sent`);
  }

  public sendMessage(message: Message): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages`, message);
  }

}
