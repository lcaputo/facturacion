import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { map, Observable, startWith } from 'rxjs';

export interface DialogData {
  view        : string;
  form        : FormGroup;
  list        : any,
  updateId    : number,
}

@Component({
  selector: 'app-modal-inventario',
  templateUrl: './modal-inventario.component.html',
  styleUrls: ['./modal-inventario.component.scss']
})
export class ModalInventarioComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AppService,
  ) {}

  suppliers: any
  searchSuppliers = new FormControl();
  public filteredOptions: Observable<any[]>
  public options: { id: number; name: string }[]
  
  ngOnInit(): void {
    this.getSuppliers()
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(obj:any): string{
    return obj && obj.name ? obj.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSuppliers() {
    this.service.get('/product/supplier/').subscribe(
      (res:any) => {
        console.log('response', res);
        this.options = res
        this.filteredOptions = this.searchSuppliers.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      },
      (err:any) => {
        
      }
    )
  }





  create() {
    console.log(this.data.form.value)
    this.loading = true;
    this.service.post('/product/', this.data.form.value).subscribe(
      (res:any) => {
        console.log('create response', res);
        this.data.list();
        this.loading= false;
        this.data.form.reset()
        this.onNoClick()
        swal.fire('Exito!', 'Producto registrado.', 'success')
      },
      (err:any) => {
        swal.fire('Error registrando el producto', err, 'error');
        this.loading = false;
      }
    )
  }


    update() {
    console.log(this.data.form.value)
    this.loading = true;
    this.service.patch(`/product/update/${this.data.updateId}/`, this.data.form.value).subscribe(
      (res:any) => {
        console.log('res',res)
        this.loading = false;
        this.data.list();
        this.onNoClick()
        swal.fire('Exito!', 'Producto actualizado.', 'success')
      },
      (err:any) => {
        swal.fire('Error actualizando el producto', err, 'error');
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
