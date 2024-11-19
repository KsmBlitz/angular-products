import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent }, // Ruta raíz redirige a ProductsComponent
  { path: '**', redirectTo: '' } // Redirige cualquier ruta inválida a la raíz
];
