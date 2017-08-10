import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Game } from '../models/game';
import { GameTemplate } from '../models/game-template';
import { Router } from '@angular/router';
import { Tile } from '../models/tile';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
})
export class GameNewComponent implements OnInit {

  model: Game;

  tiles: Tile[] = null;

  gameTemplates: GameTemplate[] = [];

  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.newGame();

    this.api.getTemplates().subscribe(templates => {
      this.gameTemplates = templates;
      this.newGame();
    });
  }

  onSubmit() {
    this.api.createGame(this.model.gameTemplate.id, this.model.minPlayers, this.model.maxPlayers)
      .subscribe(() => this.router.navigate(['games']));
  }

  onChange(newValue: any) {
    const template = this.gameTemplates.find(item => item.id === newValue);
    this.tiles = template.tiles;
  }

  newGame(): boolean {
    this.tiles = null;

    this.model = new Game();
    this.model.minPlayers = 1;

    if (this.gameTemplates.length > 0) {
      this.model.gameTemplate.id = this.gameTemplates[0].id;
      this.onChange(this.gameTemplates[0].id);
      return true;
    }
    return false;
  }
}