import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-account',
  imports: [CommonModule, RouterLink],
  templateUrl: './seller-account.component.html',
  styleUrl: './seller-account.component.css',
})
export class SellerAccountComponent implements OnInit {
  products: Product[] | undefined;
  productMessage: string | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.getProducts();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 5000);
  }

  getProducts() {
    this.productService.products.subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.products = result;
      }
    });
  }
}
