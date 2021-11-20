import { DashboardModule } from './shared/components/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AuthGuardService } from './guards/check-login.guard';
import { FacturacionComponent } from './shared/components/facturacion/facturacion.component';
import { NavigationComponent } from './shared/layout/navigation/navigation.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';
import { ServiciosComponent } from './shared/components/servicios/servicios.component';
import { ClientesComponent } from './shared/components/clientes/clientes.component';
import { InventarioComponent } from './shared/components/inventario/inventario.component';
import { GastosComponent } from './shared/components/gastos/gastos.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { 
    path: '', 
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard', 
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./shared/components/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      { 
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'facturacion',
        component: FacturacionComponent,
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'gastos',
        component: GastosComponent,
        canActivate: [AuthGuardService] 
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
