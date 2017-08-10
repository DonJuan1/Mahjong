import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobbyButtonComponent } from './game-lobby-button.component';

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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
