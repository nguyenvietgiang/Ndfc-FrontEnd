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
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { FogotpassComponent } from './components/fogotpass/fogotpass.component';



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
    UserInfoComponent,
    FogotpassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
