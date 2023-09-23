import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { PostComponent } from './components/post/post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FogotpassComponent } from './components/fogotpass/fogotpass.component';
import { MatchComponent } from './components/match/match.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { SubcriberComponent } from './components/subcriber/subcriber.component';
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
  { path:'trangchu', component: HomeComponent },
  { path:'dangnhap', component: LoginComponent},
  { path:'dangky', component: RegisterComponent},
  { path:'doihinh', component: LineupComponent},
  { path:'tintuc', component: PostComponent},
  { path:'baiviet', component: DetailPostComponent},
  { path:'lienhe', component: ContactComponent},
  { path:'taikhoan', component: UserInfoComponent},
  { path:'quenmatkhau', component: FogotpassComponent},
  { path:'trandau', component: MatchComponent},
  { path:'subcribe', component: SubcriberComponent},
  { path: '', component: SplashComponent },
  { path:'**', component: ErrorpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
