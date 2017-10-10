import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-game-lobby-button',
  templateUrl: './game-lobby-button.component.html',
})
export class GameLobbyButtonComponent {

  @Input() game: Game;

  constructor(private api: ApiService) {
  }

  //Get the button text according to the game state
  get buttonText() {
    //Check if the user is in game
    if (!this.inGame()) {
      //Check if there is room to join the game
      if (this.game.maxPlayers <= this.game.players.length) {
        return null;
      }

      return 'Join Game!';
    }

    //Check if the user is owner of the game
    if (!this.ownerOfGame()) {
      return 'Leave Game!';
    }

    return 'Start Game!';
  }

  doAction() {
    //Check if the user is in game
    if (!this.inGame()) {
      //Check if there is room to join the game
      if (this.game.maxPlayers <= this.game.players.length) {
        return;
      }

      return this.joinGame();
    }

    //Check if the user is owner of the game
    if (!this.ownerOfGame()) {
      return this.leaveGame();
    }

    return this.startGame();
  }

  //Check if the user has joined the game
  private inGame(): boolean {
    return this.game.players.map(item => item._id).indexOf(this.api.email) > -1;
  }

  //Check if the user is owner of the game
  private ownerOfGame() {
    return this.game.createdBy._id === this.api.email;
  }

  //Leave the game (This is not implemented in the server)
  private leaveGame() {
    this.api.leaveGame(this.game).subscribe(bool => {
    });
  }

  //Join the current game
  private joinGame() {
    this.api.joinGame(this.game).subscribe(bool => {
    });
  }

  //Start the current game
  private startGame() {
    this.api.startGame(this.game).subscribe(message => {
    });
  }

}
