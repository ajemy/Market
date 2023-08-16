import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsCart: any[] = [];
  total: any;
  full: boolean = true;
  success: boolean = false;
  constructor(private service: CartsService) {
    this.getProducts();
    if (this.productsCart.length == 0) {
      this.full = false;
    } else {
      this.full = true;
    }
  }
  ngOnInit(): void {
    this.getTotalPrice();
  }

  getProducts() {
    if ('cart' in localStorage) {
      this.productsCart = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.productsCart);
  }
  add(value: number) {
    this.productsCart[value].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.productsCart));
    this.getTotalPrice();
  }
  minus(value: number, event: any) {
    if (this.productsCart[value].quantity > 0) {
      this.productsCart[value].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.productsCart));
      this.getTotalPrice();
      // } else if (this.productsCart[value].quantity <= 0) {
      //   event.target.disabled = true;
    }
  }
  change() {
    localStorage.setItem('cart', JSON.stringify(this.productsCart));
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total = 0;
    for (let i of this.productsCart) {
      this.total += i.quantity * i.item.price;
    }
  }
  delete(i: number) {
    this.productsCart.splice(i, 1);
    if (this.productsCart.length == 0) {
      this.full = false;
      localStorage.clear();
    } else {
      this.full = true;
      localStorage.setItem('cart', JSON.stringify(this.productsCart));
    }
    this.getTotalPrice();
  }
  clear() {
    localStorage.clear();
    this.productsCart = [];
    this.full = false;
  }
  order() {
    let prductsData = this.productsCart.map(function (item) {
      return { productId: item.item.id, quantity: item.quantity };
    });
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + '-' + month + '-' + day;
    let data = {
      userId: 5,
      date: newdate,
      products: prductsData,
    };
    this.service.sendData(data).subscribe((res: any) => {
      this.success = true;
      console.log(res);
    });
    this.success = true;
    this.clear();
    // console.log(data);
  }
}
