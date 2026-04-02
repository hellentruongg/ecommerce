import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  signUp(data: Account) {
    return this.httpClient.post('http://localhost:3000/seller', data);
  }

  reloadPage() {
    const seller = localStorage.getItem('seller');

    if (seller) {
      this.router.navigate(['seller-account']);
    }
  }
}

/*
TÄNK PÅ
- Att HttpClient en inbyggd service i Angular
- Att HttpClient används för att göra HTTP-anrop, t.ex. GET, POST, PUT, DELETE
- Att http-anrop returnerar ett Observable, inte själva datan
- Att observable är ett objekt som ger data över tid
- Att subscribe() är obligatorisk och används för att lyssna på resultatet av http-förfrågan; man "prenumererar" på Observable
- Att subscribe() tar in en callback som används för att hantera resultatet av http-förfrågan; callbacken körs när resultatet har tagits emot
*/
