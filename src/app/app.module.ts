import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpanishRootComponent } from './spanish-root/spanish-root.component';
import { DataLoadComponent } from './data-load/data-load.component';
import { TranslationTestComponent } from './translation-test/translation-test.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SpanishRootComponent,
    DataLoadComponent,
    TranslationTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
