import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainComponent } from './components/main/main.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';

const routes: Routes = [
  {path:'movie-detail',component:MovieDetailComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'users', component:UsersComponent},
  {path:'main', component:MainComponent}, //if logged in...
  {path: 'user-homepage', component:UserHomepageComponent}, 
  {path:'',component:WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
