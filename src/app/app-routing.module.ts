import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpanishRootComponent} from "./spanish-root/spanish-root.component";


const routes: Routes = [
  { path: 'spanish', component: SpanishRootComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
