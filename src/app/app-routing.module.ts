import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) },
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) },
  { path: 'technician', loadChildren: () => import('src/app/technician/technician.module').then(m => m.TechnicianModule) }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false,scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
