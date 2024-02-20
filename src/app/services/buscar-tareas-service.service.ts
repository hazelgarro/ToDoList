import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarTareasServiceService {

  private searchResultsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public searchResults$: Observable<any[]> = this.searchResultsSubject.asObservable();

  constructor() { }

  updateSearchResults(results: any[]): void {
    this.searchResultsSubject.next(results);
  }
}
