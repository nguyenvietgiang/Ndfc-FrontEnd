import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { PostComponent } from './components/post/post.component';
import { FormsModule } from '@angular/forms';
// sử dụng thư viện này để thao tác với cookie dùng bản @10 để tương thích với angular 11
import { CookieService } from 'ngx-cookie-service';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LineupComponent,
    PostComponent,
    DetailPostComponent,
    ContactComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
