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
  let api: ApiServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        GameBoardTileComponent
      ],
      imports: [RouterTestingModule],
      providers: [ApiServiceMock]
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
    api = TestBed.get(ApiServiceMock);
    component._tiles = api.getTiles();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('should make tile clickable', () => {

     expect(component.can(component._tiles[0])).toBe(true);
    //TODO
  });
    it('should match the tiles', () => {
      expect(component.MatchMaker(component._tiles[0], component._tiles[1])).toBe(true);
      //TODO
    });
    it('should show a hinted tile', () =>{
      component.hint();
      expect(component.hintedTiles[0].isHinted).toBe(true);
    })

    
});
