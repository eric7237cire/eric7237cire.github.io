import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpanishRootComponent } from './spanish-root/spanish-root.component';
import { DataLoadComponent } from './data-load/data-load.component';

@NgModule({
  declarations: [
    AppComponent,
    SpanishRootComponent,
    DataLoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
