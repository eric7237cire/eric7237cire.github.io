import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpanishRootComponent} from "./spanish-root/spanish-root.component";
import {DataLoadComponent} from "./data-load/data-load.component";
import {TranslationTestComponent} from "./translation-test/translation-test.component";
import {TareaComponent} from "./tarea/tarea.component";


const routes: Routes = [
  { path: '', component: SpanishRootComponent },
  { path: 'data-load', component: DataLoadComponent },
  { path: 'trans-test', component: TranslationTestComponent },
  { path: 'tarea', component: TareaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
