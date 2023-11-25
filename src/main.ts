import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { GameComponent } from './game/game.component';
import { GameFeature } from './game/store/game/game.reducer';
import { GameEffects } from './game/store/game/game.effects';

@Component({
  selector: 'app',
  standalone: true,
  imports: [GameComponent],
  template: `
    <h1>Hello from {{name}}!</h1>
    <katamino-game/>
  `,
})
export class App {
  name = 'Anubis Game';
}

bootstrapApplication(App, {
  providers: [
    provideStore(),
    provideState(GameFeature),
    // provideStoreDevtools(),
    provideEffects([GameEffects]),
  ],
});
