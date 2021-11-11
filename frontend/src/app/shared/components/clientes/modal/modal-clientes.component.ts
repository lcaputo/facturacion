import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';

export interface DialogData {
  view        : string;
  form        : FormGroup;
  list        : any,
  updateId    : number,
}

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.scss']
})
export class ModalClientesComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AppService,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    this.loading = true;
    this.service.post('/client/', this.data.form.value).subscribe(
      (res:any) => {
        console.log('create response', res);
        this.data.list();
        this.loading= false;
        this.data.form.reset()
        this.onNoClick()
        swal.fire('Exito!', 'Cliente registrado.', 'success')
      },
      (err:any) => {
        swal.fire('Error registrando al cliente', err, 'error');
        this.loading = false;
      }
    )
  }


    update() {
    console.log(this.data.form.value)
    this.loading = true;
    this.service.patch(`/client/update/${this.data.updateId}/`, this.data.form.value).subscribe(
      (res:any) => {
        console.log('res',res)
        this.loading = false;
        this.data.list();
        this.onNoClick()
        swal.fire('Exito!', 'Cliente actualizado.', 'success')
      },
      (err:any) => {
        swal.fire('Error actualizando al cliente', err, 'error');
        this.loading = false;
      }
    )
  }

  
  submit() {
    if ( this.data.view === 'CREATE' ) {
      this.create()
    } else if ( this.data.view === 'UPDATE' ) {
      this.update()
    }
  }



}
