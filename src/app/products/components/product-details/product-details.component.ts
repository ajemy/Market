import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  id: any;
  data: any;
  loading = false;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
    console.log(this.id);
  }
  getData() {
    this.loading = true;
    this.service.getProuductDetails(this.id).subscribe(
      (res: any) => {
        this.data = res;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        alert(error);
      }
    );
  }
}
