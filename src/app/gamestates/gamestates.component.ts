import { Component, OnInit } from '@angular/core';
import { MahjongApiService } from '../mahjong-api.service';

@Component({
  selector: 'gamestates',
  templateUrl: './gamestates.component.html',
  styleUrls: ['./gamestates.component.css'],
  providers: [MahjongApiService]
})

export class GamestatesComponent implements OnInit {
  public gameStats;

  constructor(private mahjongApiService: MahjongApiService) { }

  ngOnInit() {
    this.mahjongApiService.getGameStates().subscribe(
      data => this.gameStats = data.json(),
      error => alert(error)
    );
  }
}
