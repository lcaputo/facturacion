import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalGastosComponent } from './modal/modal-gastos.component';


export interface Expense {
  id                        : number;
  name                      : string;
  description               : string;
  cost                      : number;
}


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit, AfterViewInit {

  public form!              : FormGroup;
  public view               : string = '';
  public loading            : boolean = false;
  public updateId!          : number;
  public expenses           : any = {};
  public detail             : any = {};
  public search             : string = '';

    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'name', 'description', 'cost'];
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
      name: ['', [
          Validators.required, 
      ]],
      description: ['', [
        Validators.required, 
      ]],
      cost: ['', [
        Validators.required, 
      ]],
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  
  list() {
    this.loading = true;
    this.service.get('/expenses/').subscribe(
      (res:any) => {
        console.log(res);
        this.expenses = res;
        this.dataSource.data = res as Expense[];
        this.loading = false;
      },
      (err:any) =>{
        console.log('Error', err)
        this.openSnackBar('Error al consultar los gastos', 'ok')
        this.loading = false;
      }
    )
  }

  delete(id: number, name: string) {
    swal.fire({
      icon: 'warning',
      title: `Desea borrar el gasto #${id} ${name} ?`,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.service.delete(`/expenses/delete/${id}/`).subscribe(
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
    const dialogRef = this.dialog.open(ModalGastosComponent, {
      maxWidth: '98vw',
      width: '40rem',
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
    this.service.get(`/expenses/detail/${id}/`).subscribe(
      (res:any) => {
        console.log(res)
        this.detail['name'] = res.name
        this.detail['description'] = res.description
        this.detail['cost'] = res.cost
        
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

