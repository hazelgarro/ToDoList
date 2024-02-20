import { Component } from '@angular/core';
import { TareaServiceService } from '../../services/tarea-service.service';
import { BuscarTareasServiceService } from '../../services/buscar-tareas-service.service';

@Component({
  selector: 'app-tareas-buscar',
  templateUrl: './tareas-buscar.component.html',
  styles: ``
})
export class TareasBuscarComponent {

  bName: string = '';
  searchResults: any[] = [];

  constructor(private searchService: TareaServiceService, private searchResultsService: BuscarTareasServiceService) { }

  search(): void {
    if (this.bName.trim() !== '') {
      this.searchService.search(this.bName).subscribe(
        (results: any) => {
          this.searchResultsService.updateSearchResults(results);
          this.bName = '';
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
    else{
      this.searchResultsService.updateSearchResults(this.searchResults);
    }
  }
}
