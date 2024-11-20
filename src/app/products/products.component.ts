import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Chart } from 'chart.js/auto';

// Saludos 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent {
  products: any[] = [];
  newProduct = { nombre: '', precio: 0, cantidad_disponible: 0 };
  chart: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadMostSoldProduct();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  async addProduct() {
    if (this.newProduct.nombre && this.newProduct.precio > 0 && this.newProduct.cantidad_disponible > 0) {
      await this.productService.createProduct(this.newProduct);
      this.newProduct = { nombre: '', precio: 0, cantidad_disponible: 0 };
      this.loadProducts();
    }
  }

  async loadMostSoldProduct() {
    const product = await this.productService.getMostSoldProduct();
    this.renderChart(product.nombre, product.cantidadVendida);
  }

  async renderChart(productName: string, sales: number) {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [productName],
        datasets: [{
          label: 'Cantidad Vendida',
          data: [sales],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}