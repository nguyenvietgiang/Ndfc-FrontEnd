import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
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
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { MatchComponent } from './components/match/match.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SubcriberComponent } from './components/subcriber/subcriber.component';
import { SplashComponent } from './components/splash/splash.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}


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
    ErrorpageComponent,
    MatchComponent,
    SubcriberComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    // lang config
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
