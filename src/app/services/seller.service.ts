import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Signup } from '../models/account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  get user() {
    return localStorage.getItem('seller');
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  set user(user: any) {
    if (user) {
      localStorage.setItem('seller', JSON.stringify(user));
    }
  }

  signUp(data: Signup) {
    return this.httpClient.post('http://localhost:3000/seller', data);
  }

  logIn(data: Login) {
    console.warn(data);

    return this.httpClient.get(
      `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    );
  }

  reloadPage() {
    // const seller = localStorage.getItem('seller');

    if (this.isLoggedIn) {
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

- Att localStorage getItem returnerar null om ingen användare finns eller en string (t.ex. JSON) om användaren finns
- Att två negationer (!!) konverterar ett värde till boolean utan att vända, medan en negation (!) vänder på värdet
*/
