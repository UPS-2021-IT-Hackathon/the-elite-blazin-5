import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { BlenderModelComponent } from './blender-model/blender-model.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    BlenderModelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
