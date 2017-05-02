import { Component, OnInit } from '@angular/core';
import { MahjongApiService } from '../mahjong-api.service';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [MahjongApiService, PagerService],

})

export class GamesComponent implements OnInit {
  private games: any[];

  public loaded: Boolean;
  public pager: any = {};
  public pagedItems: any[];

  constructor(private mahjongApiService: MahjongApiService, private pagerService: PagerService) { }

  ngOnInit() {
    this.loaded = false;

    this.mahjongApiService.getGames().subscribe(
      data => this.games = data.json(),
      error => alert(error),
      () => this.doneLoading()
    );
  }

  doneLoading() {
    this.pagedItems = this.games;
    this.setPage(1);
    this.loaded = true;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.games.length, page);

    // get current page of items
    this.pagedItems = this.games.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
