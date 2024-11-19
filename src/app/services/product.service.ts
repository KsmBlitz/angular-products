import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

export class ProductService {
  async getProducts() {
    const response = await axios.get(`${BASE_URL}productos/`);
    return response.data;
  }

  async createProduct(product: { nombre: string; precio: number; cantidad_disponible: number }) { // Asegúrate de que los nombres de los campos coincidan
    const response = await axios.post(`${BASE_URL}productos/`, product);
    return response.data;
  }

  async getMostSoldProduct() {
    const response = await axios.get(`${BASE_URL}productos/mas-vendido/`);
    return response.data;
  }
}