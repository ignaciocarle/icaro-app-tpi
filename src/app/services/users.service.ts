import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../interfaces/users';

import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private sharedService: SharedService, private cookies: CookieService) { }

  public getUsers(): Observable<any> {// reemplazar any por la la interfaz de Users
    return this.http.get(`${this.sharedService.API_PATH}/users`);
  }

  public login(user: Users): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/login`, user);
  }

  public registerUser(newUser: Users): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users`, newUser);
  }

  //metodos del cookies

  public currentUser: string = this.getCurrentUser();

  public setCurrentUser(token: string): void {
    this.cookies.set("username", token)
    this.currentUser = token;
    console.log(`currentUser = ${token}`);/////////////
  }

  public getCurrentUser(): string {
    return this.cookies.get("username")
  }

  public clearCurrentUser(): void {
    this.cookies.delete("username")
    this.currentUser = this.getCurrentUser();
    console.log(`currentUser cleared`);////////////

  }
}
