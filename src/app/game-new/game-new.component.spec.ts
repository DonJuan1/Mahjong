import { ApiService } from './../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { GameTemplate } from './../models/game-template';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from '../models/game';
import { GameNewComponent } from './game-new.component';
import { Tile } from '../models/tile';


describe('GameNewComponent', () => {
  let component: GameNewComponent;
  let fixture: ComponentFixture<GameNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameNewComponent
      ],
      imports: [RouterTestingModule]
    }).overrideComponent(GameNewComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Templates', () => {
    component.ngOnInit();
    expect(component.gameTemplates.entries.length).toBeGreaterThan(0);

  })
  it('should create a new game', () => {
    component.ngOnInit();
    expect(component.newGame()).toBe(true);

  })

});
