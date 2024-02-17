import { Component, OnInit} from '@angular/core';
import { TareaServiceService } from '../services/tarea-service.service';
import { TareaService } from '../services/tarea-service.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: ``
})
export class TareasComponent implements OnInit {

  constructor(public service: TareaServiceService, private toastr: ToastrService){

  }

  
  ngOnInit(): void {
    this.service.refreshList();
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
  

}
