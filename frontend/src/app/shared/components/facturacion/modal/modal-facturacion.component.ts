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

  constructor(
    public dialogRef: MatDialogRef<ModalFacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AppService,
  ) {}
  
  ngOnInit(): void {
    this.getEmployee();
    this.getClients();
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
        /* this.employeesOptions = res
        this.filteredEmployeesOptions = this.searchEmployees.valueChanges.pipe(
          startWith(''),
          map(value => this._employeesFilter(value)),
        ); */
      },
      (err:any) => {
        
      }
    )
  }

  getClients() {
    this.service.get('/client/').subscribe(
      (res:any) => {
        this.clients = res
        // this.clientsOptions = res
        // this.filteredClientsOptions = this.searchClients.valueChanges.pipe(
        //   startWith(''),
        //   map(value => this._clientsFilter(value)),
        // );
      },
      (err:any) => {
        
      }
    )
  }



}
