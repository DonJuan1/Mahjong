import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login/loginCallback.component';
import { GameNewComponent } from './game-new/game-new.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'callback', component: LoginCallbackComponent },
    { path: 'newgame', component: GameNewComponent, canActivate: [AuthGuard] },
    { path: 'games', pathMatch: 'full', redirectTo: '/games/all' },
    { path: 'games/:state', component: GameListComponent, canActivate: [AuthGuard] },
    { path: 'games/game/:id', component: GameLobbyComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
