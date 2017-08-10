import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Game } from '../models/game';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {

  games: Game[];
  private state: string

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.state = params['state'];

      if (this.state != "all" && this.state != "open" && this.state != "playing" && this.state != "finished") {
        this.router.navigate(['gamelist']);
      } else {
        this.getGames(this.state, false, false);
      }
    });


  }

  updateGames(filters: any) {
    this.getGames(this.state, filters.createdByMe, filters.joinedByMe);
  }

  lobby(game: Game) {
    this.router.navigate([`games/game/${game._id}`]);
  }

  private getGames(state, createdByMe, joinedByMe) {
    this.api.getGames(this.state, createdByMe, joinedByMe).subscribe(games => {
      this.games = games;
    });
  }
}
