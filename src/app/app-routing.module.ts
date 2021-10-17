import { AuthGuard } from './guard/shard/auth.guard';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainComponent } from './components/main/main.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path:'movie-detail',component:MovieDetailComponent, canActivate: [AuthGuard]},
  { path: 'movie-detail/:id', component: MovieDetailComponent, canActivate: [AuthGuard]},
  { path: 'movies/:search', component: MoviesComponent, canActivate: [AuthGuard]},
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'movie-search', component: MovieSearchComponent, canActivate: [AuthGuard]},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]}, //if logged in...
  { path: 'user-homepage', component: UserHomepageComponent, canActivate: [AuthGuard]},
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard]},
  {path:'',component:WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
