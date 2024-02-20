import { Component, OnInit} from '@angular/core';
import { TareaServiceService } from '../services/tarea-service.service';
import { BuscarTareasServiceService } from '../services/buscar-tareas-service.service';
import { TareaService } from '../services/tarea-service.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: ``
})
export class TareasComponent implements OnInit {

  searchResults: any[] = [];
  estadoBusqueda: boolean = false;

  constructor(public service: TareaServiceService, private toastr: ToastrService,  private searchResultsService: BuscarTareasServiceService){

  }

  
  ngOnInit(): void {
    this.service.refreshList();

    this.searchResultsService.searchResults$.subscribe(
      (results: any[]) => {
        this.searchResults = results;
        console.log(this.searchResults);
        if(this.searchResults.length > 0){
          this.estadoBusqueda = true;
        }else{
          this.estadoBusqueda = false;
        }
      }
    );
  }

  populateForm(selectedRecord: TareaService){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if(confirm('Esta segura de querer eliminar la tarea?')){
      this.service.deleteTarea(id).subscribe({
      next: res => {
        console.log(res);
        this.toastr.error("Se elimino la tarea con exito");
        this.service.refreshList()
      }, 
      error: err => {console.error(err)}
    }), this.service.refreshList();
    }
  }
  
  TareasListaCompleta(){
    this.estadoBusqueda = false;
  }

  getBorderColor(estado: string): string {
    console.log("Estado:", estado);
    switch (estado) {
        case 'Pendiente':
            return 'red';
        case 'En proceso':
            return '#53d4ff';
        case 'Terminado':
            return 'green';
        default:
            return 'gray'; 
    }
}

getColor(estado: string): string {
  console.log("Estado:", estado);
  switch (estado) {
      case 'Pendiente':
          return 'red';
      case 'En proceso':
          return '#53d4ff';
      case 'Terminado':
          return 'green';
      default:
          return 'gray'; 
  }
}
}
