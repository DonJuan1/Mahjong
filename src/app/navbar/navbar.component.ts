import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { GameState } from '../models/gamestate';
import { Game } from '../models/game';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  email: string;
  gameStates: GameState[];

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.email = this.api.email;
    this.api.getGameStates().subscribe(gameStates => {
      this.gameStates = gameStates;
    });
  }

  logout(): void {
    this.api.logout();
    this.router.navigate(['login']);
  }

  switchTheme(themeUrl) {
    var link = document.getElementById('theme');
    link.setAttribute('href', themeUrl);
    return false;
  }

}
