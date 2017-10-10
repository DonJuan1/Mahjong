import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { Tile } from '../models/tile';
import { ApiService } from "../api.service";


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html'
})
export class GameBoardComponent {

   _tiles: Tile[]
  private clickedTile: GameBoardTileComponent;
  hintedTiles: [Tile, Tile];

  @Input() set tiles(value: Tile[]) {
    this._tiles = value;
    this.tilesToDraw = [];

    if (this._tiles != null) {
      this.drawTile(0);
    }
  }

  //Is template for new game
  @Input() viewOnly = false;

  //Emit event if tiles are matched
  @Output() tilesMatched: EventEmitter<Tile[]> = new EventEmitter();

  public tilesToDraw: Tile[];

  constructor(private api: ApiService) { }

  //Method when a tile is clicked
  canSelect(component: GameBoardTileComponent) {

    //If there are tiles hinted, unhint them
    if (this.hintedTiles != null) {
      this.hintedTiles[0].isHinted = false;
      this.hintedTiles[1].isHinted = false;
      this.hintedTiles = null;
    }

    //Is the clicked tile clickable
    var clickable = this.can(component.tile)
    if (clickable) {
      //Is there already a clicked tile
      if (this.clickedTile == null) {
        this.clickedTile = component;
        this.clickedTile.isSelected = true;
      } else {
        //Is the clicked tile the same as the already clicked tile
        if (this.clickedTile != component) {
          var isMatch = this.MatchMaker(this.clickedTile.tile, component.tile);
        }

        //Is there are match
        if (isMatch) {
          var matchedTiles = [this.clickedTile.tile, component.tile];
          this.tilesMatched.emit(matchedTiles);
        }

        this.clickedTile.isSelected = false;
        this.clickedTile = null;
      }
    }
  }

  //Recursive method to draw tile with a small delay
  private drawTile(index) {
    if (index == this._tiles.length) return;
    this.tilesToDraw.push(this._tiles[index]);
    setTimeout(() => { this.drawTile(index + 1) });
  }

  //Check if the two selected tiles can match
  MatchMaker(selectedTile: Tile, compareTile: Tile): boolean {
    let match = selectedTile.tile.suit === compareTile.tile.suit &&
      (selectedTile.tile.matchesWholeSuit ? true : selectedTile.tile.name === compareTile.tile.name);

    return match;
  }

  //Check if a tile can be selected
  can(tile: Tile): boolean {
    let can = true;

    let hasRight = false;
    let hasLeft = false;

    //Filter all imported tiles for optimization
    const tiles = this._tiles
      .filter(item => item.match == undefined && item._id !== tile._id)
      .filter(item => [tile.zPos, tile.zPos + 1].indexOf(item.zPos) > -1)
      .filter(item => [tile.yPos - 1, tile.yPos, tile.yPos + 1].indexOf(item.yPos) > -1)
      .filter(item => [tile.xPos - 2, tile.xPos - 1, tile.xPos, tile.xPos + 1, tile.xPos + 2].indexOf(item.xPos) > -1);

    tiles.forEach(item => {
      //Is tile on the same height
      if (item.zPos === tile.zPos) {
        //Is there a tile right
        if (item.xPos === tile.xPos + 2) {
          hasRight = true;
          //Is there a tile left
        } else if (item.xPos === tile.xPos - 2) {
          hasLeft = true;
        }

        //If there is a tile left and right, the tile cannot be selected
        if (hasRight && hasLeft) {
          can = false;
          return false;
        }
      } else if (item.zPos === tile.zPos + 1) {
        //Check if there is a tile partially on top of the selected tile
        if ([tile.yPos - 1, tile.yPos, tile.yPos + 1].indexOf(item.yPos) > -1 &&
          [tile.xPos - 1, tile.xPos, tile.xPos + 1].indexOf(item.xPos) > -1) {
          can = false;
          return false;
        }
      }
    });

    return can;
  }

  //Find a tile pare that can be matched
  hint() {
    //Are there already hinted tiles
    if (this.hintedTiles != null) {
      this.hintedTiles[0].isHinted = false;
      this.hintedTiles[1].isHinted = false;
    }

    //Is there already a tiles selected
    if (this.clickedTile != null) {
      this.clickedTile.isSelected = false;
      this.clickedTile = null;
    }

    //Get all the tiles that are possible to match
    const tiles = this._tiles.filter(tile => tile.match == undefined && this.can(tile));
    const possibilities: [Tile, Tile][] = []

    tiles.forEach(item => {
      //Find a match for each tile
      const tile = tiles.find(tile => tile.tile._id !== item.tile._id && this.MatchMaker(tile, item));
      //Is there tile found that matched
      if (!!tile) {
        possibilities.push([tile, item]);
      }
    });

    //Are there possible matches
    if (possibilities.length > 0) {
      const randomMatch = Math.floor(Math.random() * possibilities.length);
      this.hintedTiles = possibilities[randomMatch];
      this.hintedTiles[0].isHinted = true;
      this.hintedTiles[1].isHinted = true;
    }
  }
}



