import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  product: Product | undefined;
  formMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);

    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.product = data;
      });
    }
  }
  updateProduct(data: any) {
    if (this.product) {
      data.id = this.product.id;
    }

    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.formMessage = 'Product has updated successfully';
      }
    });

    setTimeout(() => {
      this.formMessage = undefined;
    }, 3000);

    console.warn(data);
  }
}

/*
TÄNK PÅ
- Att ActivatedRoute ger information om den aktuella/aktiva routen (url:en)
- Att snapshot är en ögonblicksbild av routen just nu, vilket betyder att värdet hämtas en gång (när komponenten laddas första gången) och uppdateras inte automatiskt
- Att om man t.ex går från product/5 till product/6 så är det samma route och samma komponent (t.ex {path: 'product/:id', component: ProductDetailsComponent }), då laddas komponenten inte om och id hämtat med snaphot uppdateras inte, men med paramsMap + subscribe(callback fn) körs funktionen igen och uppdaterar id
- Att paramMap är en Observable (= objekt som kan skicka data vid olika tidpunkter); just paramMap skickar nya parametrar varje gång URL:en ändras
- Att parameter är en del av URL:en, t.ex /:id
- Att subscribe() lyssnar på förändringar; den lyssnar varje gång ett nytt värde kommer från Observable
- Att subscribe() tar emot en paramsMap-objekt som innehåller alla parametrar för aktuell route
*/
