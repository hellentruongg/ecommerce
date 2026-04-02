import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Account } from '../../models/account';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller',
  imports: [FormsModule, NgIf],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent implements OnInit {
  showLogin = false;

  constructor(
    private sellerService: SellerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sellerService.reloadPage();
  }

  signUp(data: Account): void {
    // console.warn(data);

    // WITHOUT AUTH GUARD
    // this.sellerService.userSignUp(data).subscribe((result) => {
    //   if (result) {
    //     this.router.navigate(['seller-account']);
    //   }
    // });

    // WITH AUTH GUARD
    this.sellerService.signUp(data).subscribe((result) => {
      if (result) {
        localStorage.setItem('seller', JSON.stringify(result));

        this.router.navigate(['seller-account']);
      }
    });
  }

  logIn(data: Account): void {
    console.warn(data);

    // WITH AUTH GUARD
    // this.sellerService.signUp(data).subscribe((result) => {
    //   if (result) {
    //     localStorage.setItem('seller', JSON.stringify(result));

    //     this.router.navigate(['seller-account']);
    //   }
    // });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}

/*
TÄNK PÅ
- Att HttpClient en inbyggd service i Angular
- Att HttpClient används för att göra HTTP-anrop, t.ex. GET, POST, PUT, DELETE
- Att http-anrop returnerar ett Observable som kommer ge datan senare, inte själva datan direkt
- Att observable är ett objekt som ger data över tid
- Att subscribe() är obligatorisk och används för att lyssna på resultatet av http-förfrågan; man "prenumererar" på Observable
- Att subscribe() tar in en callback som används för att hantera resultatet av http-förfrågan; callbacken körs när resultatet har tagits emot

- Att auth guard är ett koncept där man skyddar sidor från obehöriga, t.ex mina sidor ska vara otillgänglig för alla utom användaren själv

- Att komponenter har en livscykel; den börjar när komponenten skapas och slutar när den tas bort från DOM
- Att OnInit är en livecycle-hook som används för att lyssna på när komponenten laddas in
- Att ngOnInit() körs en gång efter att Angular har skapat komponenten och satt alla @Input()-värden
*/
