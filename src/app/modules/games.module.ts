import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameNewComponent } from '../game-new/game-new.component';
import { GameListComponent } from '../game-list/game-list.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameFilterComponent } from '../game-filter/game-filter.component';
import { GameBoardModule } from './game-board.module';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        GameBoardModule,
        SharedModule
    ],
    declarations: [
        GameListComponent,
        GameNewComponent,
        GameFilterComponent,
    ],
    bootstrap: [GameListComponent]
})
export class GamesModule {
}
