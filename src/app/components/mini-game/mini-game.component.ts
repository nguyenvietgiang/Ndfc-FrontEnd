import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/Models/player.model';
import { GamesvService } from 'src/app/Services/gamesv.service';

@Component({
  selector: 'app-mini-game',
  templateUrl: './mini-game.component.html',
  styleUrls: ['./mini-game.component.css']
})
export class MiniGameComponent implements OnInit {
  // phải gán một giá trị mặc định trước khi sử dụng
  player: Player = {} as Player;
  guessedName: string = '';
  showImage: boolean = false;
  errorMessage: string | null = null;
  constructor(private gameService: GamesvService) {}

  ngOnInit() {
    // Gọi API để lấy thông tin cầu thủ
    this.gameService.getPlayerRandom().subscribe(
      (data: Player) => {
        this.player = data;
        // Hiển thị thông tin cầu thủ như role, position, age
      },
      (error) => {
        console.error('Error fetching player data:', error);
      }
    );
  }

  checkGuess() {
    // Kiểm tra xem tên cầu thủ nhập vào có đúng không
    if (this.guessedName.toLowerCase() === this.player.name.toLowerCase()) {
      this.showImage = true;
    } else {
      console.log('Sai rồi. Hãy thử lại!');
      this.errorMessage = 'Sai rồi. Hãy thử lại!';
    }
  }
}
