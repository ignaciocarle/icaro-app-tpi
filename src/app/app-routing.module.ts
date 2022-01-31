import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MessagesComponent } from './components/messages/messages.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentComponent } from './components/sent/sent.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",

  },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  {
    path: "messages", component: MessagesComponent, children: [
      {
        path: "inbox",
        component: InboxComponent, pathMatch: "full"
      }, {
        path: "sent",
        component: SentComponent, pathMatch: "full"
      }]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
