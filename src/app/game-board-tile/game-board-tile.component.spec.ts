import { Tile } from './../models/tile';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameBoardTileComponent } from './game-board-tile.component';

describe('GameBoardTileComponent', () => {
  let component: GameBoardTileComponent;
  let fixture: ComponentFixture<GameBoardTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardTileComponent
      ],
      imports: [RouterTestingModule, FormsModule, BrowserAnimationsModule],
      
    }).overrideComponent(GameBoardTileComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have a style', () => {
    component.tile = {
          _id: '1',
          xPos: 1,
          yPos:  3,
          zPos:  1,
          tile:  {
            _id: 1,
            suit: 'seasons',
            name: '1',
            matchesWholeSuit: false
        },
          match: {
            foundBy: 'Jonathan',
            otherTileId: '5',
            foundOn: null
        },
          forceShown: null,
          shownAtTime: null
        }
    
    expect(component.getStyle()).toBeDefined();
  });
});
