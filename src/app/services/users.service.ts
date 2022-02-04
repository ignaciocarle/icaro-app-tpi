import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { async, Observable } from 'rxjs';

import { User } from '../interfaces/users';

import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersList!: User[];

  constructor(private http: HttpClient, private sharedService: SharedService, private cookies: CookieService) {
    this.usersList = this.getUsersList()
  }

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
  public getUsersList(): User[] {
    const fetched: User[] = []
    const observer = {
      next: (response: any) => {
        response.forEach((element: User) => {
          fetched.push(element)
        });
        //fetched = response;
        console.log("Lista de %cusuarios%c desde getUsersList()", "color:red;", ""); /////
        console.log(fetched); /////////////////////////////////////
      },
      error: (e: any) => {
        console.log("ERROR al recuperar los usuarios");
        console.log(e);
      }
    }

    this.fetchUsers().subscribe(observer);
    return fetched;
  }

  public getUserById(id: string): string {//////////////////////////////////////////////////hacer un find aca
    return this.usersList[Number(id) - 1].username
  }

  //metodos de cookies
  public setCurrentUser(token: string): void {
    this.cookies.set("username", token, undefined, "/");
    this.sharedService.currentUser = token;
    //console.log(`currentUser = ${token}`);/////////////////////
  }

  public clearCurrentUser(): void {
    this.cookies.delete("username", "/");
    this.sharedService.currentUser = "";
    //console.log(`currentUser cleared`);////////////
  }

  public getCurrentUser(): string {
    this.sharedService.currentUser = this.cookies.get("username");
    return this.sharedService.currentUser;
  }
}
