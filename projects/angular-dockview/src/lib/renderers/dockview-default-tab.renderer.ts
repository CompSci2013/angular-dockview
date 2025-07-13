import {
  ITabRenderer,
  TabPartInitParameters,
  PanelUpdateEvent,
} from 'dockview-core';
import { DockviewPanelApi } from 'dockview-core';
import { DockviewTabRendererParams } from '../dockview.types';

export class DefaultTabRenderer implements ITabRenderer {
  element: HTMLElement;
  private _panel?: DockviewPanelApi;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('default-tab-renderer');

    // Title placeholder
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('tab-title');
    this.element.appendChild(titleSpan);

    // Spacer
    const spacer = document.createElement('div');
    spacer.style.flex = '1';
    this.element.appendChild(spacer);

    // Popout icon
    const popoutIcon = document.createElement('span');
    popoutIcon.classList.add('codicon', 'codicon-new-window', 'popout-icon');
    popoutIcon.title = 'Open in new window';
    popoutIcon.style.cursor = 'pointer';

    popoutIcon.onclick = () => {
      if (this._panel) {
        const url = `/popout/${this._panel.id}`;
        window.open(url, '_blank', 'popup,width=1000,height=700');
      }
    };

    this.element.appendChild(popoutIcon);
  }

  init(parameters: TabPartInitParameters): void {
    this._panel = parameters.api;

    const titleSpan = this.element.querySelector('.tab-title');
    if (titleSpan) {
      titleSpan.textContent = parameters.title;
    }
  }

  update(event: PanelUpdateEvent<DockviewTabRendererParams>): void {
    const titleSpan = this.element.querySelector('.tab-title');
    if (titleSpan) {
      titleSpan.textContent = event.params.title;
    }
  }

  dispose(): void {
    // No special cleanup
  }
}
