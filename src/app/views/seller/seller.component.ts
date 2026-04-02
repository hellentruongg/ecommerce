import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Account } from '../../models/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  imports: [FormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent {
  constructor(
    private sellerService: SellerService,
    private router: Router,
  ) {}

  signUp(data: Account): void {
    // console.warn(data);
    this.sellerService.userSignUp(data).subscribe((result) => {
      if (result) {
        this.router.navigate(['seller-account']);
      }
    });
  }
}
