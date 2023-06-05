import { Component, OnInit } from '@angular/core';
import { HomesvService } from './Services/homesv.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ndfc-FrontEnd';
  newsData: any;

  constructor(private homeService: HomesvService) { }

  ngOnInit(): void {
    this.getNewsData();
  }

  getNewsData(): void {
    this.homeService.getNewsData().subscribe(
      (data) => {
        this.newsData = data.content;
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
}
