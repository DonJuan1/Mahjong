import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from '../models/game';
import * as io from 'socket.io-client';
import { Tile } from '../models/tile';
import { User } from '../models/user';
import { GameBoardComponent } from '../game-board/game-board.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
})
export class GameLobbyComponent implements OnInit, OnDestroy {

  private socket;
  private canPlay = false;
  private hintAvailable = true;

  game: Game;

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  get canShowHistory() {
    return this.game.state === 'finished' && !this.canPlay;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.api.getGame(params.id).subscribe(game => {
        this.game = game;

        this.openSocket();

        if (this.game.state === 'playing') {
          this.gameStarted(this.game);
        } else if (this.game.state === 'finished') {
          this.gameEnded(this.game);
        }
      });
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  private openSocket() {
    this.socket = io(`${this.api.host}?gameId=${this.game._id}`);

    this.socket.on('playerJoined', data => this.playerJoined(data));
    this.socket.on('match', data => this.matchFound(data));
    this.socket.on('start', () => this.gameStarted(this.game));
    this.socket.on('end', () => this.gameEnded(this.game));
  }

  playerJoined(data) {
    this.game.players.push(data);
  }

  matchFound(data) {
    const player = this.game.players.find(player => player._id === data[0].match.foundBy);
    player.numberOfMatches += 1;

    data.forEach(tile => {
      const found = this.game.tiles.find(_tile => _tile._id === tile._id);
      found.match = tile.match;
    });
  }

  inGame() {
    return this.game.players.map(item => item._id).indexOf(this.api.email) > -1;
  }

  gameStarted(game: Game) {
    game.state = 'playing';
    this.api.gameTiles(game._id).subscribe(tiles => game.tiles = tiles);
    this.canPlay = this.inGame();
  }

  gameEnded(game: Game) {
    console.log("finished");
    game.state = 'finished';

    if (game.tiles == null) {
      this.api.gameTiles(game._id).subscribe(tiles => game.tiles = tiles);
    }

    this.socket.disconnect();
    this.canPlay = false;
  }


  onMatched(tiles: Tile[]) {
    this.api.matchTiles(this.game._id, tiles[0]._id, tiles[1]._id).subscribe(message => {
      //this.toastr.error(JSON.parse(error._body).message);
    });
  }

  usersChecked(users: User[]) {
    if (users.length === 0) {
      return this.game.tiles.forEach(tile => tile.forceShown = null);
    }
    console.log("usersChecked");

    this.game.tiles.forEach(tile => {
      tile.forceShown = tile.match != null && users.map(user => user._id).indexOf(tile.match.foundBy) > -1;
    });
  }



  showError(message: string) {
    //this.toastr.error(message);
    console.log(message);
  }

}
