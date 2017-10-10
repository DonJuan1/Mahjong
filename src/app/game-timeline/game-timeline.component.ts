import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tile } from '../models/tile';

@Component({
  selector: 'app-game-timeline',
  templateUrl: './game-timeline.component.html',
  styleUrls: ['./game-timeline.component.scss']
})
export class GameTimelineComponent implements OnChanges {

  currentTime = 0;

  first = new Date(0);
  last = new Date(0);

  @Input() tiles: Tile[];

  ngOnChanges(changes: SimpleChanges) {
    //Get the tiles from the changes
    const tiles = changes['tiles'].currentValue;
    if (tiles != null) {
      tiles.filter(tile => tile.match != null).forEach(tile => {
        //Get the date when the match was found
        const date = new Date(tile.match.foundOn);

        if (this.last.getFullYear() <= 1970 || this.last < date) {
          this.last = date;
          this.currentTime = this.last.getTime();
        } else if (this.first.getFullYear() <= 1970 || this.first > date) {
          this.first = date;
        }
      });
    }
  }

  historyChange() {
    //Set the shown at time for each tile
    this.tiles.forEach(tile => {
      tile.shownAtTime = (this.last.getTime() === this.currentTime ? null : this.currentTime);
    });
  }

}
