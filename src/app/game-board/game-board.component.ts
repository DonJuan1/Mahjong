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
    component.isSelected = !component.isSelected
    var select = this.isClickable(component.tile.xPos,component.tile.yPos, component.tile.zPos)
    console.log(select);
  }

  private drawTile(index) {
    if (index == this._tiles.length) return; //done
    this.tilesToDraw.push(this._tiles[index]);
    setTimeout(() => { this.drawTile(index + 1) });
  }

  private isClickable(px,py,pz):boolean{
    var match = true;
        for(var l = 0; l < 3; l++){
          var tile;
            if( tile = this.tiles.find(tile => tile.xPos == ((px -1)+l)  && tile.yPos == (py -1) &&  tile.zPos == pz) != undefined){
              match = false;
              if(tile.isMatched || tile.matchesWholeSuit){
                match = false;
              }
            }   
        }
        if(match){
        for(var r = 0; r < 3; r++){
         if(tile = this.tiles.find(tile => tile.xPos == ((px -1)+r)  && tile.yPos == (py +1) &&  tile.zPos == pz) != undefined){
              match = false;
              if(tile.isMatched || tile.matchesWholeSuit){
                match = false;
              }
            }
        }
      }
      if(match){
        for(var u = 0; u < 9; u++){
          var left = -1 + (u / 3);
          if(tile = this.tiles.find(tile => tile.xPos == (px+left)  && tile.yPos == ((py-1) + (u % 3)) &&  tile.zPos == pz) != undefined){
            match = false;
            if(tile.isMatched || tile.matchesWholeSuit){
                match = false;
              }
          }
        }
        } 
     
    return match;
  }
  public MatchMaker(selectedTile,compareTile): boolean{
    var match = false;
      if(selectedTile.tile.name == compareTile.tile.name || selectedTile.tile.suit == compareTile.tile.suit){
        match = true;
      }
    

    return match;
  }
}



