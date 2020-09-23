import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Character } from '../models/character.model';

const ENDPOINT_URL = 'https://www.breakingbadapi.com/api/characters';

@Injectable({
  providedIn: 'root'
})
export class BreakingBadCharsService {

  private characters: Subject<Character[]> = new Subject<Character[]>();
  private charName = '';

  constructor(private httpClient: HttpClient) { }

  public filterByName(name = ''): void {
    this.charName = name;
    this.httpClient.get<Character[]>(ENDPOINT_URL, { params: { name: this.charName } }).subscribe(chars => this.characters.next(chars));
  }

  public getCharachters(): Observable<Character[]> {
    this.filterByName(this.charName);
    return this.characters;
  }
}
