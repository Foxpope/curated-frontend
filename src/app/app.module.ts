import { UserSearchComponent } from './components/user-search/user-search.component';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-interceptor-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { FollowerListComponent } from './components/follower-list/follower-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserDetailComponent,
    UsersComponent,
    MovieDetailComponent,
    MoviesComponent,
    ReviewsComponent,
    ReviewDetailComponent,
    MovieSearchComponent,
    RegistrationComponent,
    WelcomeComponent,
    LoginComponent,
    MainComponent,
    UserHomepageComponent,
    UserSearchComponent,
    FollowingListComponent,
    FollowerListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgbModule,
    RatingModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
