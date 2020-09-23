import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharCardComponent } from './components/char-card/char-card.component';
import { CharGridComponent } from './components/char-grid/char-grid.component';
import { SearchCharComponent } from './components/search-char/search-char.component';
import { CharLoadingComponent } from './components/char-loading/char-loading.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreakingBadCharsService } from './services/breaking-bad-chars.service';



@NgModule({
  declarations: [CharCardComponent, CharGridComponent, SearchCharComponent, CharLoadingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CharCardComponent,
    CharGridComponent,
    SearchCharComponent,
    CharLoadingComponent,
  ],
  providers: [
    BreakingBadCharsService
  ]
})
export class BreakingBadCharsModule { }
