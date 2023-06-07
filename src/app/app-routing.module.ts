import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LineupComponent } from './lineup/lineup.component';
import { PostComponent } from './post/post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'dangnhap', component: LoginComponent},
  { path:'dangky', component: RegisterComponent},
  { path:'doihinh', component: LineupComponent},
  { path:'tintuc', component: PostComponent},
  { path:'baiviet', component: DetailPostComponent},
  { path:'lienhe', component: ContactComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
