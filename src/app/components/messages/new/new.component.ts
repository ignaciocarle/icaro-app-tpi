import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public usersList?: User[]

  constructor(private usersService: UsersService) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  private getUsers(): void {
    const usernameList: User[] = []

    this.usersService.getUsersList().forEach((element: User) => {
      const usernameOnly: User = {
        username: element.username
      }
      usernameList.push(usernameOnly)
    })
    this.usersList = usernameList
  }
}
