import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  // ACCIONES AL INICIAR EL COMPONENTE
  ngOnInit(): void {
  
  }

  ngAfterViewInit() {

  }


  // DISPARAR ALERTAS PARA INFORMACIÓN DEL USUARIO
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // CERRAR SESIÓN
  logout() {
    this.auth.logout();
    this.openSnackBar('Hasta Pronto :)', 'listo');
  }
    
}

