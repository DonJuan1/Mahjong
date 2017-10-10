import { FormsModule } from '@angular/forms';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTimelineComponent } from './game-timeline.component';

describe('GameTimelineComponent', () => {
  let component: GameTimelineComponent;
  let fixture: ComponentFixture<GameTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTimelineComponent,
      
      ],
      imports: [FormsModule]
    }).overrideComponent(GameTimelineComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
