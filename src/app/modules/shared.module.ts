import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        BrowserAnimationsModule,
        CommonModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class SharedModule {
}
