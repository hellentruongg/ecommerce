import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-seller-add-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  formMessage: string | undefined;

  constructor(private productService: ProductService) {}

  addProduct(data: Product): void {
    this.productService.addProduct(data).subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.formMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.formMessage = undefined;
    }, 5000);
  }
}
