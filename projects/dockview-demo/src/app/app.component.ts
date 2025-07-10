// projects/dockview-demo/src/app/app.component.ts

import { Component } from '@angular/core';
import { defaultConfig } from './default-layout';
import type { DockviewApi } from 'dockview-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Provide the layout function to the container */
  layoutFn = (api: DockviewApi) => defaultConfig(api);
}
