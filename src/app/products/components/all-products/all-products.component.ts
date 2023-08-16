import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { OnInit } from '@angular/core';
import { product, productCart } from '../../models/iterface';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: product[] = [];
  productCategory: string[] = [];
  productsCart: productCart[] = [];
  loading: boolean = false;

  constructor(private service: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategoryProduct();
  }
  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
        console.log(res);
      },
      (error) => {
        alert(error);
        this.loading = false;
      }
    );
  }
  getCategoryProduct() {
    this.service.getCategoryItem().subscribe((res: any) => {
      this.productCategory = res;
    });
  }
  filter1($event: any) {
    let value = $event.target.value;
    if (value == 'All') {
      this.getProducts();
    } else {
      this.loading = true;
      this.service.getProuduct(value).subscribe(
        (res: any) => {
          this.products = res;
          this.loading = false;
        },
        (error: any) => {
          alert(error);
          this.loading = false;
        }
      );
    }
  }
  addItem(event: productCart) {
    if ('cart' in localStorage) {
      this.productsCart = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.productsCart.find(
        (item) => item.item.id == event.item.id
      );

      if (exist) {
        alert('this item is already in your cart');
        console.log(exist);
      } else {
        this.productsCart.push(event);
        localStorage.setItem('cart', JSON.stringify(this.productsCart));
      }
    } else {
      this.productsCart.push(event);
      localStorage.setItem('cart', JSON.stringify(this.productsCart));
    }
  }
}
