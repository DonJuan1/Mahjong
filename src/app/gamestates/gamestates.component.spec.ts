import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestatesComponent } from './gamestates.component';

describe('GamestatesComponent', () => {
  let component: GamestatesComponent;
  let fixture: ComponentFixture<GamestatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamestatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamestatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
