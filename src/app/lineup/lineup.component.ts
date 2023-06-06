import { Component, OnInit } from '@angular/core';
import { LineupsvService } from '../Services/lineupsv.service';
//sử lý các tệp tin lấy từ localhost
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {
  playerData: any;
  constructor(private lineupService: LineupsvService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getLineupData();
  }
  
  getLineupData(): void {
    this.lineupService.getPlayerData().subscribe(
      (data) => {
        this.playerData = data.content;
        // Xử lý URL để tạo URL an toàn
        this.playerData.forEach((item: any) => {
          item.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(item.sImg);
        });
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
}
