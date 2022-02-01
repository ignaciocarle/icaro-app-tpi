import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interfaces/users';

import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public usersList: Array<User> = this.setUsersList();//lista de usuarios

  constructor(private http: HttpClient, private sharedService: SharedService, private cookies: CookieService) { /*this.setUsersList()*/ }

  //metodos de la solicitud a la API
  public login(user: User): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/login`, user);
  }

  public registerUser(newUser: User): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users`, newUser);
  }

  private fetchUsers(): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users`);
  }


  //metodos de manejo de datos
  public setUsersList(): Array<User> {
    let fetchedUsersList: Array<User> = [];

    this.fetchUsers().subscribe({
      next: (response: any) => {
        fetchedUsersList = response
        this.usersList = response
        console.log("Lista de usuarios desde setUsersList()");/////
        console.log(response);///////////////////////////
      },
      error: (e) => {
        console.log("ERROR al recuperar los usuarios");
        console.log(e);
      }
    });
    return fetchedUsersList;
  }

  //metodos publicos de acceso a los datos
  public getUsersList(): Array<User> {
    this.setUsersList();
    return this.usersList;
  }

  public getUserById(id: string): User {
    let user: User = this.usersList[Number(id) - 1];
    return user
  }

  //metodos de cookies
  public setCurrentUser(token: string): void {
    this.cookies.set("username", token, undefined, "/");
    this.sharedService.currentUser = token;
    console.log(`currentUser = ${token}`);/////////////////////
  }

  public clearCurrentUser(): void {
    this.cookies.delete("username", "/");
    this.sharedService.currentUser = "";
    console.log(`currentUser cleared`);////////////
  }

  public getCurrentUser(): string {
    this.sharedService.currentUser = this.cookies.get("username");
    return this.sharedService.currentUser;
  }
}
