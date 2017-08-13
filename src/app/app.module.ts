import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LoginModule } from '../app/modules/login.module';
import { GamesModule } from '../app/modules/games.module';
import { GameBoardModule } from '../app/modules/game-board.module';
import { GameLobbyModule } from '../app/modules/game-lobby.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './common/auth.guard';

import { Routing } from './app.routes';

import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    GameBoardModule,
    GamesModule,
    GameLobbyModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
