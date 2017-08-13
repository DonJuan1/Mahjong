import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChatboxComponent } from './game-chatbox.component';

describe('GameChatboxComponent', () => {
  let component: GameChatboxComponent;
  let fixture: ComponentFixture<GameChatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameChatboxComponent ]
    })
    .compileComponents();
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
