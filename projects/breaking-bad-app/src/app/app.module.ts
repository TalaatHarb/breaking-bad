import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CastPageComponent } from './pages/cast-page/cast-page.component';
import { HeaderComponent } from './components/header/header.component';
import { BreakingBadCharsModule } from 'projects/breaking-bad-chars/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    CastPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreakingBadCharsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
