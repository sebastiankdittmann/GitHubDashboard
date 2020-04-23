import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatCardModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GithubStatisticsComponent } from './components/home/github-statistics/github-statistics.component';
import { PopularReposComponent } from './components/home/github-statistics/popular-repos/popular-repos.component';
import { LoginComponent } from './components/home/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRepositoriesComponent,
    HeaderComponent,
    HomeComponent,
    GithubStatisticsComponent,
    PopularReposComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
