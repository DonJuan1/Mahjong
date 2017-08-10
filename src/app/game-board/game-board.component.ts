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

  @Output() tilesMatched: EventEmitter<Tile[]> = new EventEmitter();

  public tilesToDraw: Tile[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  canSelect(component: GameBoardTileComponent) {
    var clickable = this.can(component)
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


  private can(tile: GameBoardTileComponent): boolean {
    let can = true;

    let hasRight = false;
    let hasLeft = false;

    const tiles = this._tiles
      .filter(item => item.match == undefined && item._id !== tile.tile._id)
      .filter(item => [tile.tile.zPos, tile.tile.zPos + 1].indexOf(item.zPos) > -1)
      .filter(item => [tile.tile.yPos - 1, tile.tile.yPos, tile.tile.yPos + 1].indexOf(item.yPos) > -1)
      .filter(item => [tile.tile.xPos - 2, tile.tile.xPos - 1, tile.tile.xPos, tile.tile.xPos + 1, tile.tile.xPos + 2].indexOf(item.xPos) > -1);

    tiles.forEach(item => {
      if (item.zPos === tile.tile.zPos) {
        if (item.xPos === tile.tile.xPos + 2) {
          hasRight = true;
        } else if (item.xPos === tile.tile.xPos - 2) {
          hasLeft = true;
        }

        if (hasRight && hasLeft) {
          can = false;
          return false;
        }
      } else if (item.zPos === tile.tile.zPos + 1) {
        if ([tile.tile.yPos - 1, tile.tile.yPos, tile.tile.yPos + 1].indexOf(item.yPos) > -1 &&
          [tile.tile.xPos - 1, tile.tile.xPos, tile.tile.xPos + 1].indexOf(item.xPos) > -1) {
          can = false;
          return false;
        }
      }
    });

    return can;
  }

  private hint() {

  }

}



