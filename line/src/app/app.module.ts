import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Line1Component } from './line1.component';
import { Spiral1Component } from './spiral1.component';
import { Line2Component } from './line2.component';
import { Spiral2Component } from './spiral2.component';

const appRoutes: Routes = [
  { path: '', component: Line1Component },
  { path: 'spiral1', component: Spiral1Component },
  { path: 'line2', component: Line2Component },
  { path: 'spiral2', component: Spiral2Component },
];

@NgModule({
  declarations: [
    AppComponent,
    Line1Component,
    Spiral1Component,
    Line2Component,
    Spiral2Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
   ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
