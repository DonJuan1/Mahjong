import { Game } from './../models/game';
import { GameLobbyButtonComponent } from './game-lobby-button.component';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('GameLobbyButtonComponent', () => {
  let component: GameLobbyButtonComponent;
  let fixture: ComponentFixture<GameLobbyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameLobbyButtonComponent
      ],
      imports: [RouterTestingModule]
    }).overrideComponent(GameLobbyButtonComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLobbyButtonComponent);
    component = fixture.componentInstance;
    component.game = new Game();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should join a game', () =>{
      expect(component.buttonText).toBe('Join Game!');
  });
});