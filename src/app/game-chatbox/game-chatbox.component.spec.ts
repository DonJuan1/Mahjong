import { EmailPipe } from './../pipes/email-pipe.pipe';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChatboxComponent } from './game-chatbox.component';

describe('GameChatboxComponent', () => {
  let component: GameChatboxComponent;
  let fixture: ComponentFixture<GameChatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameChatboxComponent, EmailPipe ]
    }).overrideComponent(GameChatboxComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
