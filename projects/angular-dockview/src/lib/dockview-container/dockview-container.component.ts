// File: projects/angular-dockview/src/lib/dockview-container/dockview-container.component.ts

import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { createDockview, DockviewApi } from 'dockview-core';
import type {
  DockviewComponentOptions,
  CreateComponentOptions,
  IHeaderActionsRenderer,
} from 'dockview-core/dist/cjs/dockview/options';
import type { IContentRenderer } from 'dockview-core/dist/cjs/dockview/types';
import type { DockviewGroupPanel } from 'dockview-core/dist/cjs/dockview/dockviewGroupPanel';

@Component({
  selector: 'dvw-dockview-container',
  templateUrl: './dockview-container.component.html',
  styleUrls: ['./dockview-container.component.css'],
})
export class DockviewContainerComponent implements AfterViewInit {
  @Input() config?: (api: DockviewApi) => void;

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private dockview!: DockviewApi;

  public get api(): DockviewApi {
    return this.dockview;
  }

  constructor() {}

  ngAfterViewInit(): void {
    const options: Partial<DockviewComponentOptions> = {
      defaultTabComponent: 'default',
      createRightHeaderActionComponent: (
        group: DockviewGroupPanel
      ): IHeaderActionsRenderer => {
        const element = document.createElement('div');
        const addButton = (icon: string, title: string, action: () => void) => {
          const btn = document.createElement('button');
          btn.className = `codicon ${icon}`;
          btn.title = title;
          btn.onclick = action;
          element.appendChild(btn);
        };
        addButton('codicon-trash', 'Close panel', () =>
          this.dockview.removePanel(group.activePanel!)
        );
        addButton('codicon-window', 'Open in new window', () =>
          window.open(`/popout/${group.activePanel!.id}`, '_blank')
        );
        return { element, init: () => {}, dispose: () => {} };
      },
      createComponent: (params: CreateComponentOptions): IContentRenderer => ({
        element: (() => {
          const el = document.createElement('div');
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.height = '100%';
          el.innerText = `Panel: ${params.id}`;
          return el;
        })(),
        init: () => {},
      }),
    };

    this.dockview = createDockview(
      this.container.nativeElement,
      options as DockviewComponentOptions
    );
    this.config?.(this.dockview);
  }
}
