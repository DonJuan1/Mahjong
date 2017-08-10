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
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './game-board-tile.component.html',
  styleUrls: ['./game-board-tile.component.scss']
})

export class GameBoardTileComponent implements OnInit {

  @Input() tile: Tile;
  @Input() clickable: boolean;

  @Output() clicked: EventEmitter<GameBoardTileComponent> = new EventEmitter();

  background: string;
  randomNumber: number
  isSelected = false;

  constructor() { }

  ngOnInit() {
    if (this.tile.tile != null) {
      this.background = `${this.tile.tile.suit}-${this.tile.tile.name}`.toLowerCase();
    }

    //this.randomNumber = Math.floor(Math.random() * 2) + Math.floor(Math.random() * -2)
    this.randomNumber = 0
  }

  getStyle(): any {
    return {
      'left': ((this.tile.xPos) * 18) + (4 * this.tile.zPos) + this.randomNumber + 'px',
      'top': ((this.tile.yPos) * 26 - (5 * this.tile.zPos)) + this.randomNumber + 'px',
      'z-index': ((this.tile.zPos * 100) - this.tile.xPos + this.tile.yPos) + 1000,
      'transform': `rotate(${this.randomNumber}deg)`,
      'display': `${this.visable}`
    }
  }

  canSelect() {
    if (!this.clickable) {
      return;
    }

    this.clicked.emit(this);
  }

  get visable() {
    if (this.tile.match == undefined) {
      return 'block'
    } else {
      return 'none'
    }
  }
}
