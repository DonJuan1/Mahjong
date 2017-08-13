import { GameLobbyButtonComponent } from '../game-lobby-button/game-lobby-button.component';
import { GameTimelineComponent } from '../game-timeline/game-timeline.component';
import { GameLobbyComponent } from '../game-lobby/game-lobby.component';
import { GameChatboxComponent } from '../game-chatbox/game-chatbox.component';
import { UserListComponent } from '../user-list/user-list.component';
import { EmailPipe } from '../pipes/email-pipe.pipe';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardModule } from './game-board.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
        UserListComponent,
        GameLobbyComponent,
        GameTimelineComponent,
        GameLobbyButtonComponent,
        GameChatboxComponent,
        EmailPipe,
    ],
    bootstrap: [GameLobbyComponent]
})
export class GameLobbyModule {
}
