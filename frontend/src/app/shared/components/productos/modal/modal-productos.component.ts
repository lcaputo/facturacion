import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  view: string;
  form: FormGroup;
  list: any;
  updateId: number;
}

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.scss'],
})
export class ModalProductosComponent implements OnInit {
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AppService,
    private _snackBar: MatSnackBar
  ) {}

  suppliers: any;
  categories: any;
  searchSuppliers = new FormControl();

  ngOnInit(): void {
    this.getSuppliers();
    this.getCategories();
  }

  displayFn(obj: any): string {
    return obj && obj.name ? obj.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSuppliers() {
    this.service.get('/product/supplier/').subscribe(
      (res: any) => {
        this.suppliers = res;
      },
      (err: any) => {}
    );
  }

  create() {
    console.log(this.data.form.value);
    this.loading = true;
    this.service.post('/product/', this.data.form.value).subscribe(
      (res: any) => {
        console.log('create response', res);
        this.data.list();
        this.loading = false;
        this.data.form.reset();
        this.onNoClick();
        swal.fire('Exito!', 'Producto registrado.', 'success');
      },
      (err: any) => {
        swal.fire('Error registrando el producto', err, 'error');
        this.loading = false;
      }
    );
  }

  update() {
    console.log(this.data.form.value);
    this.loading = true;
    this.service
      .patch(`/product/update/${this.data.updateId}/`, this.data.form.value)
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.loading = false;
          this.data.list();
          this.onNoClick();
          swal.fire('Exito!', 'Producto actualizado.', 'success');
        },
        (err: any) => {
          swal.fire('Error actualizando el producto', err, 'error');
          this.loading = false;
        }
      );
  }

  submit() {
    if (this.data.view === 'CREATE') {
      this.create();
    } else if (this.data.view === 'UPDATE') {
      this.update();
    }
  }

  // ALERTS
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getCategories() {
    this.loading = true;
    this.service
      .get('/product/category/')
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.categories = res;
          this.loading = false;
        },
        (err: any) => {
          this.openSnackBar('Error al consultar las categorias', 'ok')
          this.loading = false;
        }
      );
  }
}
