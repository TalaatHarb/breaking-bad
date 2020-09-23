import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../../models/character.model';
import { BreakingBadCharsService } from '../../services/breaking-bad-chars.service';

@Component({
  selector: 'bbchars-char-grid',
  templateUrl: './char-grid.component.html',
  styleUrls: ['./char-grid.component.scss']
})
export class CharGridComponent implements OnInit, OnDestroy {

  public characters: Character[] = [];
  public isLoading = true;
  private subscription: Subscription;

  constructor(private charService: BreakingBadCharsService) { }

  ngOnInit(): void {
    this.subscription = this.charService.getCharachters().subscribe(chars => {
      this.characters = chars;
      this.isLoading = false;
    }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
