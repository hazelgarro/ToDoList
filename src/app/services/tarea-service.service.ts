import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TareaService } from './tarea-service.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {

  urlList:string = environment.apiBaseUrl + 'Tareas/Listado';
  urlAdd:string = environment.apiBaseUrl + 'Tareas/Agregar';
  urlEdit:string = environment.apiBaseUrl + 'Tareas/Modificar';
  urlDelete:string = environment.apiBaseUrl + 'Tareas/Eliminar?numero=';

  list: TareaService[]=[];

  formSubmitted:boolean = false;

  formData: TareaService = new TareaService();

  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.urlList).subscribe({
      next: response=>{
        this.list = response as TareaService[];
      },
      error: err => {console.log(err)}
    });
  }

  postTarea(){
    return this.http.post(this.urlAdd, this.formData, { responseType: 'text' })
  }

  putTarea(){
    return this.http.put(this.urlEdit, this.formData, { responseType: 'text' })
  }

  deleteTarea(id: number){
    return this.http.delete(this.urlDelete + id, { responseType: 'text' })
  }

  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new TareaService()
    this.formSubmitted = false
  }



}
