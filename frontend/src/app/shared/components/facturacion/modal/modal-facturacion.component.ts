import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { map, Observable, startWith } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  view        : string;
  form        : FormGroup;
  list        : any,
  updateId    : number,
}

export interface Product {
  id                        : number;
  name                      : string;
  supplier                  : number;
  description               : string;
  purchase_price            : number;
  sale_price                : number;
  stock                     : number;
  category                  : number;
}

export interface Service {
  id                        : number;
  name                      : string;
  price                     : number;
}

@Component({
  selector: 'app-modal-facturacion',
  templateUrl: './modal-facturacion.component.html',
  styleUrls: ['./modal-facturacion.component.scss']
})
export class ModalFacturacionComponent implements OnInit {

  public loading: boolean = false;

  employees: any
  clients: any
  searchEmployees   = new FormControl();
  searchClients    = new FormControl();
  public filteredEmployeesOptions: Observable<any[]>
  public employeesOptions: { id: number; name: string }[]
  public filteredClientsOptions: Observable<any[]>
  public clientsOptions: { id: number; name: string }[]

  productsDataSource = new MatTableDataSource();
  productsDisplayedColumns: string[] = ['id', 'name', 'category', 'supplier', 'stock', 'description'];
  @ViewChild('products-table') productsort!: MatSort;
  @ViewChild('products-paginator') productpaginator!: MatPaginator;

  servicesDataSource = new MatTableDataSource();
  servicesDisplayedColumns: string[] = ['id', 'name', 'price'];
  @ViewChild('services-table') servicesort!: MatSort;
  @ViewChild('services-paginator') servicepaginator!: MatPaginator;

  public serviceSearch  : string = '';
  public productSearch  : string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalFacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AppService,
    private _snackBar: MatSnackBar,
  ) {}
  
  ngOnInit(): void {
    this.getEmployee();
    this.getClients();
    this.listProducts();
    this.listServices();
  }

  private _employeesFilter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.employeesOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _clientsFilter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.clientsOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(obj:any): string{
    return obj && obj.name ? obj.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEmployeeSelectionChange(event: any){
    console.log('onSelectionChange called', event.option.value.id);
    this.data.form.patchValue({
      employee: event.option.value.id,
    })
  }

  onClientSelectionChange(event: any){
    console.log('onSelectionChange called', event.option.value.id);
    this.data.form.patchValue({
      client: event.option.value.id,
    })
  }

  create() {
    this.loading = true;
    this.service.post('/bill/', this.data.form.value).subscribe(
      (res:any) => {
        console.log('create response', res);
        this.data.list();
        this.loading= false;
        this.data.form.reset()
        this.onNoClick()
        swal.fire('Exito!', 'Empleado registrado.', 'success')
      },
      (err:any) => {
        swal.fire('Error registrando al empleado', err, 'error');
        this.loading = false;
      }
    )
  }


    update() {
    console.log(this.data.form.value)
    this.loading = true;
    this.service.patch(`/bill/update/${this.data.updateId}/`, this.data.form.value).subscribe(
      (res:any) => {
        console.log('res',res)
        this.loading = false;
        this.data.list();
        this.onNoClick()
        swal.fire('Exito!', 'Empleado actualizado.', 'success')
      },
      (err:any) => {
        swal.fire('Error actualizando al empleado', err, 'error');
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

  getEmployee() {
    this.service.get('/employee/').subscribe(
      (res:any) => {
        this.employees = res
      },
      (err:any) => {
        
      }
    )
  }

  getClients() {
    this.service.get('/client/').subscribe(
      (res:any) => {
        this.clients = res
      },
      (err:any) => {
        
      }
    )
  }

  // ALERTS
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  listProducts() {
    this.loading = true;
    this.service.get('/product/').subscribe(
      (res:any) => {
        console.log(res);
        this.productsDataSource.data = res as Product[];
        this.loading = false;
      },
      (err:any) =>{
        console.log('Error', err)
        this.openSnackBar('Error al consultar el inventario', 'ok')
        this.loading = false;
      }
    )
  }
  
  listServices() {
    this.loading = true;
    this.service.get('/service/').subscribe(
      (res:any) => {
        console.log(res);
        this.servicesDataSource.data = res as Service[];
        this.loading = false;
      },
      (err:any) =>{
        console.log('Error', err)
        this.openSnackBar('Error al consultar los servicios', 'ok')
        this.loading = false;
      }
    )
  }

  servicesSearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.servicesDataSource.filter = filterValue.trim().toLowerCase();
  }

}
