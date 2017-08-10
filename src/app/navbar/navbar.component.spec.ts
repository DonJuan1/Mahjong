import {RouterTestingModule} from '@angular/router/testing';
import { ApiService } from './../api.service';
import { ApiServiceMock } from './../Mock/ApiServiceMock';
import { GameState } from './../models/gamestate';
import { NavbarComponent } from './navbar.component';
import { TestBed, async } from '@angular/core/testing';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [RouterTestingModule]
    }).overrideComponent(NavbarComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }]
      }
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain the correct email', () =>{
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.debugElement.componentInstance;
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.email).toBe('test@test.nl');
  })
    
  

  
});