import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-game-lobby-button',
  templateUrl: './game-lobby-button.component.html',
})
export class GameLobbyButtonComponent {

  @Input() game: Game;

  @Output() error: EventEmitter<string> = new EventEmitter();

  constructor(private api: ApiService) {
  }

  get buttonText() {
    if (!this.inGame()) {
      if (this.game.maxPlayers <= this.game.players.length) {
        return null;
      }

      return 'Join Game!';
    }

    if (!this.ownerOfGame()) {
      return 'Leave Game!';
    }

    return 'Start Game!';
  }

  doAction() {
    if (!this.inGame()) {
      if (this.game.maxPlayers <= this.game.players.length) {
        return;
      }

      return this.joinGame();
    }

    if (!this.ownerOfGame()) {
      return this.leaveGame();
    }

    return this.startGame();
  }

  private inGame(): boolean {
    return this.game.players.map(item => item._id).indexOf(this.api.email) > -1;
  }

  private ownerOfGame() {
    return this.game.createdBy._id === this.api.email;
  }

  private leaveGame() {
    this.api.leaveGame(this.game).subscribe(bool => {
      console.log(bool);
    });
  }

  private joinGame() {
    this.api.joinGame(this.game).subscribe(bool => {
      console.log(bool);
    });
  }

  private startGame() {
    this.api.startGame(this.game).subscribe(message => {
      console.log(message);
    });
  }

}
