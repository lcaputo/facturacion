import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriasComponent } from './modal/modal-categorias.component';


export interface Category {
  id                        : number;
  name                      : string;
}


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, AfterViewInit {

  public form!              : FormGroup;
  public view               : string = '';
  public loading            : boolean = false;
  public updateId!          : number;
  public employees          : any = {};
  public detail             : any = {};
  public search             : string = '';

    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['id', 'name', 'actions'];
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
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  
  list() {
    this.loading = true;
    this.service.get('/product/category/').subscribe(
      (res:any) => {
        console.log(res);
        this.employees = res;
        this.dataSource.data = res as Category[];
        this.loading = false;
      },
      (err:any) =>{
        console.log('Error', err)
        this.openSnackBar('Error al consultar los categorias', 'ok')
        this.loading = false;
      }
    )
  }

  delete(id: number, name: string) {
    swal.fire({
      icon: 'warning',
      title: `Desea borrar la categoria #${id} ${name} ?`,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.service.delete(`/product/category/delete/${id}/`).subscribe(
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
    const dialogRef = this.dialog.open(ModalCategoriasComponent, {
      maxWidth: '98vw',
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
    this.service.get(`/product/category/detail/${id}/`).subscribe(
      (res:any) => {
        console.log(res)
        this.detail['name'] = res.name
        
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
