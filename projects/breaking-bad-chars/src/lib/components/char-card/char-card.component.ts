import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'bbchars-char-card',
  templateUrl: './char-card.component.html',
  styleUrls: ['./char-card.component.scss']
})
export class CharCardComponent implements OnInit {

  @Input() character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
