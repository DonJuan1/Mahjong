import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserAnimationsModule,
        CommonModule
    ],
    declarations: [
        GameBoardComponent,
        GameBoardTileComponent,
    ],
    exports: [
        GameBoardComponent,
        GameBoardTileComponent,
    ],
    bootstrap: [GameBoardComponent]
})
export class GameBoardModule {
}
