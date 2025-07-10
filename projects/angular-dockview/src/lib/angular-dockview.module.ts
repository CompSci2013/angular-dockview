import { NgModule } from '@angular/core';
import { AngularDockviewComponent } from './angular-dockview.component';
import { DockviewContainerComponent } from './dockview-container/dockview-container.component';



@NgModule({
  declarations: [
    AngularDockviewComponent,
    DockviewContainerComponent
  ],
  imports: [
  ],
  exports: [
    AngularDockviewComponent,
    DockviewContainerComponent
  ]
})
export class AngularDockviewModule { }
