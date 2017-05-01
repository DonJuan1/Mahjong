import { Component, OnInit } from '@angular/core';
import { MahjongApiService } from '../mahjong-api.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [MahjongApiService]

})

export class GamesComponent implements OnInit {
  public gameStats;

  constructor(private mahjongApiService: MahjongApiService) { }

  ngOnInit() {
    this.mahjongApiService.getGameStates().subscribe(
      data => this.gameStats = data.json(),
      error => alert(error)
    );
  }
}
