import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GamestatesComponent } from './gamestates/gamestates.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    NavbarComponent,
    GamestatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
