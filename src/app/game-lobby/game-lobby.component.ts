import { Component, OnDestroy, OnInit } from '@angular/core';
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

  //Can the history of the game viewed
  get canShowHistory() {
    return this.game.state === 'finished' && !this.canPlay;
  }

  ngOnInit() {
    //Get the game id from the url parameters
    this.route.params.subscribe((params: Params) => {
      this.api.getGame(params.id).subscribe(game => {
        this.game = game;

        this.openSocket();

        //Check the state of the received game
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

  //Open a new socket connection
  private openSocket() {
    this.socket = io(`${this.api.host}?gameId=${this.game._id}`);

    this.socket.on('playerJoined', data => this.playerJoined(data));
    this.socket.on('match', data => this.matchFound(data));
    this.socket.on('start', () => this.gameStarted(this.game));
    this.socket.on('end', () => this.gameEnded(this.game));
  }

  //Called from socket when a new player joined the game
  playerJoined(data) {
    this.game.players.push(data);
  }

  //Called from socket when a mathed is found
  matchFound(data) {
    //Get the player who find the match
    const player = this.game.players.find(player => player._id === data[0].match.foundBy);

    //Check if the player already has found a another match
    if (player.numberOfMatches == null) {
      player.numberOfMatches = 0;
    }

    player.numberOfMatches += 1;

    data.forEach(tile => {
      //Get the tiles that are matched
      const found = this.game.tiles.find(_tile => _tile._id === tile._id);
      found.match = tile.match;
    });
  }

  //Check if the user is in the current game
  inGame() {
    return this.game.players.map(item => item._id).indexOf(this.api.email) > -1;
  }

  //Called from socket if the game is started
  gameStarted(game: Game) {
    game.state = 'playing';
    this.api.gameTiles(game._id).subscribe(tiles => game.tiles = tiles);
    this.canPlay = this.inGame();
  }

  //Called from socket if the game is ended
  gameEnded(game: Game) {
    game.state = 'finished';

    //Check if the game has tiles
    if (game.tiles == null) {
      this.api.gameTiles(game._id).subscribe(tiles => game.tiles = tiles);
    }

    this.socket.disconnect();
    this.canPlay = false;
  }


  //Send the match tiles to the server
  onMatched(tiles: Tile[]) {
    this.api.matchTiles(this.game._id, tiles[0]._id, tiles[1]._id).subscribe(message => {
    });
  }

  //Show the tiles that are matched by the selected users
  usersChecked(users: User[]) {
    if (users.length === 0) {
      return this.game.tiles.forEach(tile => tile.forceShown = null);
    }

    this.game.tiles.forEach(tile => {
      tile.forceShown = tile.match != null && users.map(user => user._id).indexOf(tile.match.foundBy) > -1;
    });
  }
}
