import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Headers, Http, Response } from '@angular/http';
import { Game } from './models/game';
import { GameState } from './models/gamestate';
import { GameTemplate } from './models/game-template';
import { Tile } from './models/tile';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    host = 'http://mahjongmayhem.herokuapp.com';

    constructor( @Inject(DOCUMENT) private document: any, private http: Http) {
    }

    get email(): string {
        return localStorage.getItem('email');
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    get isLoggedIn(): boolean {
        return !!this.email && !!this.token;
    }

    get loginUrl(): string {
        return this.url('auth/avans') + `/?callbackUrl=${this.document.location.origin}/callback`;
    }

    public logout() {
        localStorage.clear();
    }

    public getGames(state: string, createdByMe: boolean, joinedByMe: boolean): Observable<Game[]> {
        let query = "";
        query = query.concat('?state=' + state);
        if (createdByMe) {
            query = query.concat('&&createdBy=' + this.email);
        }
        if (joinedByMe) {
            query = query.concat('&&player=' + this.email);
        }

        return this.get('games'.concat(query)).map(res => res.json());
    }

    public getGame(gameId: string): Observable<Game> {
        return this.get('games/' + gameId).map(res => res.json());
    }

    public getGameStates(): Observable<GameState[]> {
        return this.get('gamestates').map(res => res.json());
    }

    public getTemplates(): Observable<GameTemplate[]> {
        return this.get('gameTemplates').map(res => res.json());
    }

    public gameTiles(gameId: string): Observable<Tile[]> {
        return this.get(`games/${gameId}/tiles`).map(res => res.json());
    }

    public matchTiles(gameId: string, tile1Id: string, tile2Id: string): Observable<boolean> {
        return this.put(`games/${gameId}/tiles`, { tile1Id: tile1Id, tile2Id: tile2Id }).map(res => res.json());
    }

    public createGame(template: string, minPlayers: number, maxPlayers: number): Observable<Game> {
        return this.post('games', {
            'templateName': template,
            'minPlayers': minPlayers,
            'maxPlayers': maxPlayers
        }).map(res => res.json());
    }


    public startGame(game: Game): Observable<boolean> {
        return this.post(`games/${game._id}/start`).map(res => res.json());
    }

    public joinGame(game: Game): Observable<boolean> {
        return this.post(`games/${game._id}/players`).map(res => res.json());
    }

    public leaveGame(game: Game): Observable<boolean> {
        return this.delete(`games/${game._id}/players`).map(res => res.json());
    }

    private url(route: string): string {
        return `${this.host}/${route}`;
    }

    private headers(): Headers {
        const headers = new Headers();
        headers.set('x-token', this.token);
        headers.set('x-username', this.email);

        return headers;
    }

    private get(route: string): Observable<Response> {
        return this.http.get(this.url(route), { headers: this.headers() });
    }

    private post(route: string, body: any = {}): Observable<Response> {
        return this.http.post(this.url(route), body, { headers: this.headers() });
    }

    private put(route: string, body: any = {}): Observable<Response> {
        return this.http.put(this.url(route), body, { headers: this.headers() });
    }

    private delete(route: string): Observable<Response> {
        return this.http.delete(this.url(route), { headers: this.headers() });
    }
}