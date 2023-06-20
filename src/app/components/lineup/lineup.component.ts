import { Component, OnInit } from '@angular/core';
import { LineupsvService } from 'src/app/Services/lineupsv.service';
import { DomSanitizer} from '@angular/platform-browser';
import { ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {
  playerData: any;
  chartData: ChartDataSets[] =[];
  chartLabels: Label[] =[];
  chartOptions: any = {};
  chartType: ChartType = 'bar';
  constructor(private lineupService: LineupsvService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getLineupData();
    this.setupChart();
  }
  
  getLineupData(): void {
    this.lineupService.getPlayerData().subscribe(
      (data) => {
        this.playerData = data.content;
        this.playerData.forEach((item: any) => {
          item.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(item.sImg);
        });
        // gọi và gán vào update khi call api.
        this.updateChart();
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }

  // cấu hình các format cho chart
  setupChart(): void {
    this.chartData = [];
    this.chartLabels = ['Bình thường', 'Chấn thương'];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.chartType = 'pie';
  }  

  updateChart(): void {
    const normalCount = this.playerData.filter((player: any) => player.status === 'Bình thường').length;
    const injuredCount = this.playerData.filter((player: any) => player.status === 'Chấn thương').length;
    this.chartData = [
      { data: [normalCount, injuredCount], label: 'Tình trạng sức khỏe' }
    ];
  }
}

