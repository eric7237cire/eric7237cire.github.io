import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpanishRootComponent} from "./spanish-root/spanish-root.component";
import {DataLoadComponent} from "./data-load/data-load.component";
import {TranslationTestComponent} from "./translation-test/translation-test.component";


const routes: Routes = [
  { path: '', component: SpanishRootComponent },
  { path: 'data-load', component: DataLoadComponent },
  { path: 'trans-test', component: TranslationTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
