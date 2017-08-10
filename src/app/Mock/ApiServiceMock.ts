import { GameTemplate } from './../models/game-template';
import { GameState } from './../models/gamestate';
import { Game } from './../models/game';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Headers, Http, Response } from '@angular/http';
import { Tile } from '../models/tile';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceMock {
    private games: Game[];
    private tiles: Tile[];
    private state: GameState[];
    private template: GameTemplate[]
    constructor() {
         this.games = [];
         this.tiles = [];
         this.state = [];
         this.template = [];
    }
    
    get email(): string {
        return 'test@test.nl';
    }

    get token(): string {
        return '123456789';
    }

    get isLoggedIn(): boolean {
        return !!this.email && !!this.token;
    }



    public getGames(state: string, createdByMe: boolean, joinedByMe: boolean): Observable<Game[]> {
       var dummy = new Game();
       var dummy2 = new Game();
       dummy._id = '1';
       dummy.createdBy = {
             _id: '0',
             name: 'Jonathan',
            numberOfMatches: 0
       }
       dummy.createdOn = '09-08-2017'
       dummy.minPlayers = 2
       dummy.maxPlayers = 4
       dummy.state = 'open'
        dummy.players = [
            {
            _id: '1',
             name: 'Jasper',
            numberOfMatches: 5
       },
        {
             _id: '0',
             name: 'Jonathan',
            numberOfMatches: 0
       }
        ]
       dummy2._id = '2'
       dummy2.createdBy = {
            _id: '1',
             name: 'Jasper',
            numberOfMatches: 5
       }
        dummy2.createdOn = '10-07-2017'
        dummy2.endedOn = '15-07-2017'
        dummy2.startedOn = '13-07-2017'
        dummy2.minPlayers = 2
        dummy2.maxPlayers = 2
        dummy2.players = [
            {
            _id: '1',
             name: 'Jasper',
            numberOfMatches: 5
       },
        {
             _id: '0',
             name: 'Jonathan',
            numberOfMatches: 0
       }
        ]
        dummy2.state = 'finished'
       
       this.games[0] = dummy;
       this.games[1] = dummy2;
        return Observable.of(new Object()).mapTo(this.games);
    }

    public getGame(gameId: number): Observable<Game> {
        return Observable.of(new Object()).mapTo(this.games[gameId]);
    }

    

    public createGame(template: string, minPlayers: number, maxPlayers: number):Observable<Game> {
        var dummy = new Game();
         dummy._id = '2';
       dummy.createdBy = {
             _id: '0',
             name: 'Jonathan',
            numberOfMatches: 0
       }
       dummy.createdOn = '09-08-2017'
       dummy.minPlayers = minPlayers
       dummy.maxPlayers = maxPlayers
       dummy.players = [
           {
            _id: '1',
             name: 'Jasper',
            numberOfMatches: 5
       },
        {
             _id: '0',
             name: 'Jonathan',
            numberOfMatches: 0
       }
       ]
       dummy.state = 'open'

        return Observable.of(new Object()).mapTo(dummy);

}
    public gameTiles(gameId: string): Observable<Tile[]> {
        return Observable.of(new Object()).mapTo(this.getTiles());
    }

     public matchTiles(gameId: string, tile1Id: string, tile2Id: string): Observable<boolean> {
         return Observable.of(new Object()).mapTo(true);
     }

    public getGameStates(): Observable<GameState[]> {
        var state1 = new GameState();
        var state2 = new GameState();
        var state3 = new GameState();
        state1.count = 1;
        state1.state = 'open';
        state2.count = 2;
        state2.state = 'playing';
        state3.count = 3;
        state3.state = 'finished';
        this.state[0] = state1;
        this.state[1] = state2;
        this.state[2] = state3;
        return Observable.of(new Object()).mapTo(this.state);
        
    }

    public getTemplates(): Observable<GameTemplate[]> {
        var template1 = new GameTemplate();
        template1.id = '1';
        template1.tiles = this.getTiles();
        var template2 = new GameTemplate();
        template2.id = '2'
        template2.tiles = this.getTiles();
        this.template[0] = template1;
        this.template[1] = template2;

        return Observable.of(new Object()).mapTo(this.template);
    }
    public getTiles(): Tile[]{
var t1 = new Tile();
        var t2 = new Tile();
        t1._id = '0';
        t1.xPos = 1;
        t1.yPos = 1;
        t1.zPos = 1;
        t1.tile = {
            _id: 0,
            suit: 'seasons',
            name: '1',
            matchesWholeSuit: false
        }

        t2._id = '1';
        t2.xPos = 1;
        t2.yPos = 3;
        t2.zPos = 1;
        t2.tile = {
            _id: 1,
            suit: 'seasons',
            name: '1',
            matchesWholeSuit: false
        }
        this.tiles[0] = t1;
        this.tiles[1] = t2;
        return this.tiles;
    }
}