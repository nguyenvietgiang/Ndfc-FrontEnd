import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) {}

ngOnInit() {
  setTimeout(() => {
    this.router.navigate(['/trangchu']); 
  }, 3000);
}

}
