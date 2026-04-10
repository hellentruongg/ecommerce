import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Login, Signup } from '../../models/account';
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
  loginError: string = '';

  constructor(
    private sellerService: SellerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sellerService.reloadPage();
  }

  signUp(data: Signup): void {
    // console.warn(data);

    // UTAN AUTH GUARD
    // this.sellerService.userSignUp(data).subscribe((result) => {
    //   if (result) {
    //     this.router.navigate(['seller-account']);
    //   }
    // });

    // MED AUTH GUARD
    this.sellerService.signUp(data).subscribe((result) => {
      if (result) {
        // localStorage.setItem('seller', JSON.stringify(result));
        this.sellerService.user = result;

        this.router.navigate(['seller-account']);
      }
    });
  }

  logIn(data: Login): void {
    // console.warn(data);
    // this.sellerService.logIn(data);

    // WITH AUTH GUARD
    this.loginError = ''; // rensa gammalt error

    this.sellerService.logIn(data).subscribe((result: any) => {
      if (result.length === 1) {
        // console.warn(result);
        // localStorage.setItem('seller', JSON.stringify(result[0]));
        this.sellerService.user = result[0];
        this.router.navigate(['seller-account']);
      } else {
        this.loginError = 'Fel email eller lösenord';
        // console.warn(this.loginError);
      }
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}

/*
TÄNK PÅ
- Att HttpClient en inbyggd service i Angular
- Att HttpClient används för att göra HTTP-anrop, t.ex. GET, POST, PUT, DELETE
- Att get() returnerar en Observable som kommer ge datan senare/i framtiden, inte själva datan direkt
- Att observable är ett objekt som ger data över tid
- Att subscribe() är obligatorisk och används för att "prenumererar" på Observable: man väntar på inkommande data
- Att subscribe() tar in en callback som används för att hantera datan; callbacken körs när datan fångas/tas emot
- Att en Observable är som en kran (= rör som leder vatten), subscribe() är som ett handtag vriden uppåt (= öppen kran) och data är som vatten ut från kranen
- Att subscribe() kan ta in en Observer-objekt istället för callback
- Att Observer-objekt innehåller egenskaperna next, error och complete; vardera innehåller en funktion
- Att next körs när data kommer (200 ok)
- Att error körs om något går fel ()
- Att complete kör när allt är klart (denna körs efter next)

- Att auth guard är ett koncept där man skyddar sidor från obehöriga, t.ex mina sidor ska vara otillgänglig för alla utom användaren själv

- Att komponenter har en livscykel; den börjar när komponenten skapas och slutar när den tas bort från DOM
- Att OnInit är en lifecycle-hook som används för att lyssna på när komponenten laddas in
- Att ngOnInit() körs en gång EFTER att Angular har skapat komponenten och satt alla @Input()-värden
- Att komponent skapas när komponenten används i en template (<app-user></app-user>) eller när man navigerar till en route som pekar på komponenten
*/
