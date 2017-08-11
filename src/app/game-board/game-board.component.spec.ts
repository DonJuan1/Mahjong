import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { GameBoardComponent } from './game-board.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        GameBoardTileComponent
      ],
      imports: [RouterTestingModule],
    }).overrideComponent(GameBoardComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('should make tile clickable', () => {
     expect(component.can).toBe(true);

  });
    it('should match the tiles', () => {
      expect(component.MatchMaker).toBe(true);
    });
});
