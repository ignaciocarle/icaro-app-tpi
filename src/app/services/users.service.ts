import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public login(user: any): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/login`, user);
  }

  public registerUser(newUser: any): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users`, newUser);
  }


  //metodos del cookies

  /*  public currentUser: string = this.getCurrentUser();*/ //no es necesario tener una variable si cada peticion getCurrentUser devuelve el currentUser

  public setCurrentUser(token: string): void {
    this.cookies.set("username", token)
    console.log(`currentUser = ${this.getCurrentUser()}`);
  }

  public getCurrentUser(): string {
    return this.cookies.get("username")
  }

  public clearCurrentUser(): void {
    return this.cookies.delete("username")
  }
}
