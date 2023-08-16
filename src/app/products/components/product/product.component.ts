import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../models/iterface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data!: product;
  @Output() item = new EventEmitter();
  amount: number = 0;
  add() {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
  addButton: boolean = false;
}
