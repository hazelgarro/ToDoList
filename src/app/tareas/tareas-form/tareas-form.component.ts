import { Component } from '@angular/core';
import { TareaServiceService } from '../../services/tarea-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styles: ``
})
export class TareasFormComponent {

  constructor(public service: TareaServiceService, private toastr: ToastrService){

  }

  agregarTarea(form: NgForm){
    this.service.formSubmitted = true;
    if(form.valid) {
      if(this.service.formData.id == 0){
        this.insertarCambio(form);
      } else {
        this.actualizarTarea(form);
      }
  }}

  insertarCambio(form: NgForm){
    this.service.postTarea().subscribe({
      next: res => {
        console.log(res);
        this.toastr.success("Se agrego la tarea con exito");
        this.service.refreshList()
      }, 
      error: err => {console.error(err)}
    }), this.service.refreshList();
  }

  actualizarTarea(form: NgForm){
    this.service.putTarea().subscribe({
      next: res => {
        console.log(res);
        this.toastr.info("Se modifico la tarea con exito");
        this.service.refreshList()
      }, 
      error: err => {console.error(err)}
    }), this.service.refreshList();
  }

}
