import { UserListComponent } from './../user-list/user-list.component';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from '../game-board/game-board.component';
import { GameLobbyComponent } from './game-lobby.component';
import { GameLobbyButtonComponent } from '../game-lobby-button/game-lobby-button.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';



describe('GameLobbyComponent', () => {
  let component: GameLobbyComponent;
  let fixture: ComponentFixture<GameLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameLobbyComponent,
        NavbarComponent,
        GameBoardComponent,
        GameLobbyButtonComponent,
        GameBoardTileComponent,
        UserListComponent
      ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: Observable.of({ id: "1" }) } }
      ]
    }).overrideComponent(GameLobbyComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should show history', () => {
    expect(component.canShowHistory).toBe(true);
  })
});
