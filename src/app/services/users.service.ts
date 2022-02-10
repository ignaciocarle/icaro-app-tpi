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

  private usersList!: User[];

  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private cookies: CookieService) {
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
  private setUsersList(): void {
    const fetched: User[] = []
    const observer = {
      next: (response: any) => {
        response.forEach((element: User) => {//////////////////////////////////cambiar este forEach por una asignacion
          fetched.push(element)
        });
        //console.log("Lista de %cusuarios%c desde getUsersList()", "color:red;", ""); /////
        //console.log(fetched); /////////////////////////////////////
      },
      error: (e: any) => {
        console.log("ERROR al recuperar los usuarios");
        console.log(e);
      }
    }

    this.fetchUsers().subscribe(observer);
    this.usersList = fetched
  }


  //metodos publicos
  public getUsersList(): User[] {
    this.setUsersList()
    return this.usersList;
  }

  public getUserById(id: string | undefined): string | undefined {/////////////hacer un find o algo aca
    return this.usersList.find((x) => x.id === id)?.username
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
