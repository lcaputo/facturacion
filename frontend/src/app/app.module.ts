import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthGuardService } from './guards/check-login.guard';
import { LoginComponent } from './auth/login/login.component';
import { FacturacionComponent } from './shared/components/facturacion/facturacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationComponent } from './shared/layout/navigation/navigation.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalEmpleadosComponent } from './shared/components/empleados/modal/modal-empleados.component';
import { ServiciosComponent } from './shared/components/servicios/servicios.component';
import { ServiciosModule } from './shared/components/servicios/servicios.module';
import { ModalServiciosComponent } from './shared/components/servicios/modal/modal-servicios.component';
import { ClientesComponent } from './shared/components/clientes/clientes.component';
import { ModalClientesComponent } from './shared/components/clientes/modal/modal-clientes.component';
import { InventarioComponent } from './shared/components/inventario/inventario.component';
import { ModalInventarioComponent } from './shared/components/inventario/modal/modal-inventario.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { GastosComponent } from './shared/components/gastos/gastos.component';
import { ModalGastosComponent } from './shared/components/gastos/modal/modal-gastos.component';
import { ModalFacturacionComponent } from './shared/components/facturacion/modal/modal-facturacion.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductosComponent } from './shared/components/productos/productos.component';
import { ModalProductosComponent } from './shared/components/productos/modal/modal-productos.component';
import { CategoriasComponent } from './shared/components/categorias/categorias.component';
import { ModalCategoriasComponent } from './shared/components/categorias/modal/modal-categorias.component';
import { ProveedoresComponent } from './shared/components/proveedores/proveedores.component';
import { ModalProveedoresComponent } from './shared/components/proveedores/modal/modal-proveedores.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FacturacionComponent,
    ModalFacturacionComponent,
    NavigationComponent,
    EmpleadosComponent,
    ModalEmpleadosComponent,
    ServiciosComponent,
    ModalServiciosComponent,
    ClientesComponent,
    ModalClientesComponent,
    InventarioComponent,
    ModalInventarioComponent,
    GastosComponent,
    ModalGastosComponent,
    ProductosComponent,
    ModalProductosComponent,
    CategoriasComponent,
    ModalCategoriasComponent,
    ProveedoresComponent,
    ModalProveedoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,    
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    ServiciosModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgSelectModule,
    MatCheckboxModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
