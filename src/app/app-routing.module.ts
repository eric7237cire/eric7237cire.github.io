import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpanishRootComponent} from "./spanish-root/spanish-root.component";
import {DataLoadComponent} from "./data-load/data-load.component";


const routes: Routes = [
  { path: 'spanish', component: SpanishRootComponent },
  { path: 'data-load', component: DataLoadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
