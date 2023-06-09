import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LineupComponent } from './lineup/lineup.component';
import { PostComponent } from './post/post.component';
import { FormsModule } from '@angular/forms';
// sử dụng thư viện này để thao tác với cookie dùng bản @10 để tương thích với angular 11
import { CookieService } from 'ngx-cookie-service';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';

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
