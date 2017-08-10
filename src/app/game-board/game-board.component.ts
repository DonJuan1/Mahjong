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
    var clickable = this.can(component.tile)
    if (clickable) {
      if (this.clickedTile == undefined) {
        this.clickedTile = component;
        this.clickedTile.isSelected = true;
      } else {
        if (this.clickedTile != component) {
          var isMatch = this.MatchMaker(this.clickedTile, component);
        }

        if (isMatch) {
          var matchedTiles = [this.clickedTile.tile, component.tile];
          this.tilesMatched.emit(matchedTiles);
        }

        this.clickedTile.isSelected = false;
        this.clickedTile = undefined;
      }
    }
  }

  private drawTile(index) {
    if (index == this._tiles.length) return; //done
    this.tilesToDraw.push(this._tiles[index]);
    setTimeout(() => { this.drawTile(index + 1) });
  }

  private MatchMaker(selectedTile, compareTile): boolean {
    return selectedTile.tile.tile.name == compareTile.tile.tile.name &&
      (selectedTile.tile.tile.suit == compareTile.tile.tile.suit || (selectedTile.tile.tile.matchesWholeSuit))
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

  private hint() {
    const tiles = this.tiles.filter(tile => tile.match == undefined && this.can(tile));
    const possibilities: Tile[] = [];

    tiles.forEach(item => {
      const i = tiles.find(tile => tile.tile._id !== item.tile._id && this.MatchMaker(tile, item));
      if (!!i) {
        possibilities.push(item);
      }
    });

    return possibilities[Math.floor(Math.random() * possibilities.length + 1)];
  }

}



