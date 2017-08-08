import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './common/auth.guard';

import { Routing } from './app.routes';

import { ApiService } from './api.service';
import { GameListComponent } from './game-list/game-list.component';
import { GameFilterComponent } from './game-filter/game-filter.component';
import { GameNewComponent } from './game-new/game-new.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardTileComponent } from './game-board-tile/game-board-tile.component';
import { GameLobbyButtonComponent } from './game-lobby-button/game-lobby-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameListComponent,
    GameFilterComponent,
    GameNewComponent,
    GameLobbyComponent,
    GameBoardComponent,
    GameBoardTileComponent,
    GameLobbyButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
