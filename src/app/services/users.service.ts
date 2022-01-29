import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User, NewUser } from '../interfaces/users';

import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private sharedService: SharedService, private cookies: CookieService) { }

  //metodos de la solicitud a la API
  public getUsers(): Observable<any> {// reemplazar any por la la interfaz de Users
    return this.http.get(`${this.sharedService.API_PATH}/users`);
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/login`, user);
  }

  public registerUser(newUser: NewUser): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users`, newUser);
  }

  //metodos de cookies
  public currentUser = this.getCurrentUser()

  public setCurrentUser(token: string): void {
    this.cookies.set("username", token);
    this.sharedService.currentUser = token;
    console.log(`currentUser = ${token}`);/////////////
  }

  public clearCurrentUser(): void {
    this.cookies.delete("username");
    this.sharedService.currentUser = "";
    console.log(`currentUser cleared`);////////////
  }

  public getCurrentUser(): string {
    return this.cookies.get("username")
  }
}
