import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakingBadCharsService } from '../../services/breaking-bad-chars.service';

@Component({
  selector: 'bbchars-search-char',
  templateUrl: './search-char.component.html',
  styleUrls: ['./search-char.component.scss']
})
export class SearchCharComponent implements OnInit, OnDestroy {

  public text = '';

  constructor(private charsService: BreakingBadCharsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.charsService.filterByName('');
  }

  filter(event: string): void{
    this.text = event;
    this.charsService.filterByName(this.text);
  }
}
