import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { Tile } from '../models/tile';
import { ApiService } from "../api.service";


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html'
})
export class GameBoardComponent {

  private _tiles: Tile[]
  private clickedTile: GameBoardTileComponent;
  private hintedTiles: [Tile, Tile];

  @Input() set tiles(value: Tile[]) {
    this._tiles = value;
    this.tilesToDraw = [];

    if (this._tiles != null) {
      this.drawTile(0);
    }
  }

  @Input() viewOnly = false;

  @Output() tilesMatched: EventEmitter<Tile[]> = new EventEmitter();

  public tilesToDraw: Tile[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  canSelect(component: GameBoardTileComponent) {
    if (this.hintedTiles != null) {
      this.hintedTiles[0].isHinted = false;
      this.hintedTiles[1].isHinted = false;
      this.hintedTiles = null;
    }

    var clickable = this.can(component.tile)
    if (clickable) {
      if (this.clickedTile == null) {
        this.clickedTile = component;
        this.clickedTile.isSelected = true;
      } else {
        if (this.clickedTile != component) {
          var isMatch = this.MatchMaker(this.clickedTile.tile, component.tile);
        }

        if (isMatch) {
          var matchedTiles = [this.clickedTile.tile, component.tile];
          this.tilesMatched.emit(matchedTiles);
        }

        this.clickedTile.isSelected = false;
        this.clickedTile = null;
      }
    }
  }

  private drawTile(index) {
    if (index == this._tiles.length) return; //done
    this.tilesToDraw.push(this._tiles[index]);
    setTimeout(() => { this.drawTile(index + 1) });
  }

  private MatchMaker(selectedTile: Tile, compareTile: Tile): boolean {
    let match = selectedTile.tile.suit === compareTile.tile.suit &&
      (selectedTile.tile.matchesWholeSuit ? true : selectedTile.tile.name === compareTile.tile.name);

    return match;
  }

  private can(tile: Tile): boolean {
    let can = true;

    let hasRight = false;
    let hasLeft = false;

    const tiles = this._tiles
      .filter(item => item.match == undefined && item._id !== tile._id)
      .filter(item => [tile.zPos, tile.zPos + 1].indexOf(item.zPos) > -1)
      .filter(item => [tile.yPos - 1, tile.yPos, tile.yPos + 1].indexOf(item.yPos) > -1)
      .filter(item => [tile.xPos - 2, tile.xPos - 1, tile.xPos, tile.xPos + 1, tile.xPos + 2].indexOf(item.xPos) > -1);

    tiles.forEach(item => {
      if (item.zPos === tile.zPos) {
        if (item.xPos === tile.xPos + 2) {
          hasRight = true;
        } else if (item.xPos === tile.xPos - 2) {
          hasLeft = true;
        }

        if (hasRight && hasLeft) {
          can = false;
          return false;
        }
      } else if (item.zPos === tile.zPos + 1) {
        if ([tile.yPos - 1, tile.yPos, tile.yPos + 1].indexOf(item.yPos) > -1 &&
          [tile.xPos - 1, tile.xPos, tile.xPos + 1].indexOf(item.xPos) > -1) {
          can = false;
          return false;
        }
      }
    });

    return can;
  }

  hint() {
    if (this.hintedTiles != null) {
      this.hintedTiles[0].isHinted = false;
      this.hintedTiles[1].isHinted = false;
    }

    if (this.clickedTile != null) {
      this.clickedTile.isSelected = false;
      this.clickedTile = null;
    }

    const tiles = this._tiles.filter(tile => tile.match == undefined && this.can(tile));
    const possibilities: [Tile, Tile][] = []

    tiles.forEach(item => {
      const tile = tiles.find(tile => tile.tile._id !== item.tile._id && this.MatchMaker(tile, item));
      if (!!tile) {
        possibilities.push([tile, item]);
      }
    });

    if (possibilities.length > 0) {
      const randomMatch = Math.floor(Math.random() * possibilities.length);
      this.hintedTiles = possibilities[randomMatch];
      this.hintedTiles[0].isHinted = true;
      this.hintedTiles[1].isHinted = true;
    }
  }
}



