import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }
  getCategoryItem() {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }
  getProuduct(value: any) {
    return this.http.get('https://fakestoreapi.com/products/category/' + value);
  }
  getProuductDetails(value: any) {
    return this.http.get('https://fakestoreapi.com/products/' + value);
  }
}
