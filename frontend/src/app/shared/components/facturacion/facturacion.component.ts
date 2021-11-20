import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalFacturacionComponent } from './modal/modal-facturacion.component';


export interface Employee {
  id                        : number;
  name                      : string;
  last_name                 : string;
  identification            : number;
  email                     : string;
  phone                     : number;
  position                  : string;
  created_at                : string;
  updated_at                : string;
}


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit, AfterViewInit {

  public form!              : FormGroup;
  public view               : string = '';
  public loading            : boolean = false;
  public updateId!          : number;
  public bills              : any = {};
  public detail             : any = {};
  public search             : string = '';

    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'employee', 'client', 'total', 'actions'];
    @ViewChild('table') sort!: MatSort;
    @ViewChild('paginator') paginator!: MatPaginator;

    
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: AppService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.list();
    this.form = this.fb.group({
      employee: ['', [
          Validators.required, 
      ]],
      client: ['', [
        Validators.required, 
      ]],
      product: ['', [
        Validators.required, 
      ]],
      service: ['', [
        Validators.required, 
      ]],
      price: ['', [
          Validators.required,
      ]],
      subtotal: ['', [
        Validators.required,
      ]],
      discount: ['', [
        Validators.required
      ]],
      total: ['', [
        Validators.required
      ]],
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  
  list() {
    this.loading = true;
    this.service.get('/bill/').subscribe(
      (res:any) => {
        console.log(res);
        this.bills = res;
        this.dataSource.data = res as Employee[];
        this.loading = false;
      },
      (err:any) =>{
        console.log('Error', err)
        this.openSnackBar('Error al consultar los facturacion', 'ok')
        this.loading = false;
      }
    )
  }

  delete(id: number, name: string) {
    swal.fire({
      icon: 'warning',
      title: `Desea borrar el empleado #${id} ${name} ?`,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.service.delete(`/bill/delete/${id}/`).subscribe(
          () => {
            this.list()
            swal.fire('Eliminado!', '', 'success')
          },
          (err:any) => {
            swal.fire('Error', err, 'error')
          }
        )
        this.loading = false;
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFacturacionComponent, {
      width: '30rem',
      data: {
        view: this.view,
        form: this.form,
        list: () => {this.list()},
        updateId: this.updateId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getDetails(id:number) {
    this.updateId = id;
    this.detail = {};
    this.view = 'UPDATE'
    this.service.get(`/bill/detail/${id}/`).subscribe(
      (res:any) => {
        console.log(res)
        this.detail['employee'] = res.employee
        this.detail['client'] = res.client
        this.detail['product'] = res.product
        this.detail['service'] = res.service
        this.detail['price'] = res.price
        this.detail['subtoal'] = res.subtoal
        this.detail['discount'] = res.discount
        this.detail['total'] = res.total
        
        this.form.setValue(this.detail)
        this.openDialog()
      }
    )
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // ALERTS
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


    
}

