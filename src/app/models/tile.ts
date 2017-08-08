export class Tile {
  _id: string;
  xPos: number;
  yPos: number;
  zPos: number;
  tile: {
    _id: number;
    suit: string;
    name: string;
    matchesWholeSuit: boolean;
  };
  match: {
    foundBy: string,
    otherTileId: string,
    foundOn: Date
  };

  isMatched: boolean;

  forceShown = null;
  shownAtTime = null;

  constructor() {
    this.isMatched = false;
  }
}
