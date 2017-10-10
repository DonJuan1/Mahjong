import { Component, OnInit, EventEmitter, Input, Output, trigger, transition, style, animate } from '@angular/core';
import { Tile } from '../models/tile';

@Component({
  selector: 'GameBoardTileComponent',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-700%)', opacity: 0.2 }),
          animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
      ]
    )
  ],
  templateUrl: './game-board-tile.component.html',
})

export class GameBoardTileComponent implements OnInit {

  @Input() tile: Tile;
  @Input() clickable: boolean;

  //Event fires when the tile is clicked
  @Output() clicked: EventEmitter<GameBoardTileComponent> = new EventEmitter();

  background: string;
  randomNumber: number
  isSelected = false;

  constructor() { }

  ngOnInit() {
    //Is there a tile available
    if (this.tile != null && this.tile.tile != null) {
      this.background = `${this.tile.tile.suit}-${this.tile.tile.name}`.toLowerCase();
    }

    //Random number for rotation of the tile
    this.randomNumber = Math.floor(Math.random() * 4) + Math.floor(Math.random() * -4)

    //Play audio sound when a tile spawned
    var audio = new Audio();
    audio.src = "assets/sounds/tile_down1.mp3";
    audio.volume = Math.random() / 4;
    audio.load();
    audio.play();
  }

  //Get the style off the tile
  getStyle(): any {
    if (this.tile != null) {
      return {
        'left': ((this.tile.xPos) * 18) + (4 * this.tile.zPos) + this.randomNumber + 'px',
        'top': ((this.tile.yPos) * 26 - (5 * this.tile.zPos)) + this.randomNumber + 'px',
        'z-index': ((this.tile.zPos * 100) - this.tile.xPos + this.tile.yPos) + 1000,
        'transform': `rotate(${this.randomNumber}deg)`,
        'display': `${this.visibility}`,
      }
    }
  }

  canSelect() {
    //Is the tile selected
    if (!this.clickable) {
      return;
    }

    this.clicked.emit(this);
  }

  //Get the visibility of the tile
  get visibility() {
    //Is the tile shown at a time (timeline)
    if (this.tile.shownAtTime != null) {
      const force = this.tile.forceShown === null ? true : !!this.tile.forceShown;

      if (this.tile.match != null) {
        return force && new Date(this.tile.match.foundOn) > new Date(this.tile.shownAtTime) ? 'block' : 'none';
      }
    }

    //Is the tile forced shown (view matched tile by player)
    if (this.tile.forceShown != null) {
      return this.tile.forceShown ? 'block' : 'none';
    }

    return this.tile.match != null ? 'none' : 'block';
  }
}

