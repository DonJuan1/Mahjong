import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { Tile } from '../models/tile';
import { ApiService } from "../api.service";


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  private _tiles: Tile[]
  private clickedTile: GameBoardTileComponent;

  @Input() set tiles(value: Tile[]) {
    this._tiles = value;
    this.tilesToDraw = [];

    if (this._tiles != null) {
      this.drawTile(0);
    }

  }

  @Input() viewOnly = false;

  public tilesToDraw: Tile[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  canSelect(component: GameBoardTileComponent) {
    var clickable = this.isClickable(component.tile.xPos, component.tile.yPos, component.tile.zPos)
    if (clickable) {
      if (this.clickedTile == undefined) {
        this.clickedTile = component;
        this.clickedTile.isSelected = true;
      } else {
        var isMatch = this.MatchMaker(this.clickedTile, component);
        this.clickedTile.isSelected = false;
        this.clickedTile = undefined;

        if (isMatch) {
          console.log("Match!♫♦b○À♫À╣Õ♀x7");
        }
      }
    }
  }

  private drawTile(index) {
    if (index == this._tiles.length) return; //done
    this.tilesToDraw.push(this._tiles[index]);
    setTimeout(() => { this.drawTile(index + 1) });
  }

  private isClickable(px, py, pz): boolean {
    var match = true;
    for (var l = 0; l < 3; l++) {
      var tile;
      if (tile = this._tiles.find(tile => tile.xPos == (px - 2) && tile.yPos == ((py - 1) + l) && tile.zPos == pz) != undefined) {

        if (match) {
          for (var r = 0; r < 3; r++) {
            if (tile = this._tiles.find(tile => tile.xPos == (px + 2) && tile.yPos == ((py - 1) + r) && tile.zPos == pz) != undefined) {
              match = false;
            }
          }
        }
      }
    }

    if (match) {
      for (var u = 0; u < 9; u++) {
        var left = -1 + Math.floor((u / 3));
        if (tile = this._tiles.find(tile => tile.xPos == (px + left) && tile.yPos == ((py - 1) + (u % 3)) && tile.zPos == pz + 1) != undefined) {
          match = false;
        }
      }
    }

    return match;
  }
  public MatchMaker(selectedTile, compareTile): boolean {
    var match = false;


    if (selectedTile.tile.tile.name == compareTile.tile.tile.name && selectedTile.tile.tile.suit == compareTile.tile.tile.suit) {
      match = true;
    }

    if (selectedTile.tile.tile.matchesWholeSuit && selectedTile.tile.tile.suit == compareTile.tile.tile.suit) {
      match = true;
    }

    return match;
  }
}



