import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  addProduct(data: Product) {
    // console.warn('Product service is called');
    return this.httpClient.post('http://localhost:3000/products', data);
  }

  get products() {
    return this.httpClient.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`http://localhost:3000/products/${id}`);
  }
}
