import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';

import { createDockview, DockviewApi } from 'dockview-core';
import type {
  DockviewComponentOptions,
  CreateComponentOptions,
} from 'dockview-core/dist/cjs/dockview/options';

import type { IContentRenderer } from 'dockview-core/dist/cjs/dockview/types';

@Component({
  selector: 'dvw-dockview-container',
  templateUrl: './dockview-container.component.html',
  styleUrls: ['./dockview-container.component.css'],
})
export class DockviewContainerComponent implements OnInit, AfterViewInit {
  /** Layout callback provided by the host */
  @Input() config?: (api: DockviewApi) => void;

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private dockview!: DockviewApi;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options: DockviewComponentOptions = {
      createComponent: (params: CreateComponentOptions): IContentRenderer => {
        const el = document.createElement('div');
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.height = '100%';
        el.innerText = `Panel: ${params.id}`;
        return { element: el, init: () => {} };
      },
    };

    this.dockview = createDockview(this.container.nativeElement, options);

    this.config?.(this.dockview);
  }
}
