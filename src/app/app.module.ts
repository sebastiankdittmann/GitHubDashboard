import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatCardModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRepositoriesComponent,
    HeaderComponent
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
