import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menu: string = 'default';

  constructor(
    private router: Router,
    private sellerService: SellerService,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        // console.warn(val.url);
        if (this.sellerService.user && val.url.includes('seller')) {
          console.warn('this is inside seller page');
          this.menu = 'seller';
        } else {
          console.warn('this is outside seller page');
          this.menu = 'default';
        }
      }
    });
  }
}

/*
TÄNK PÅ:
- Att Router är en service i Angular som ansvarar för navigation mellan sidor
- Att Angular skapar en Router-instans när man injectar router som dependency i komponent
- Att router.events är en Observable
- Att Observable är ett objekt som ger data över tid; den kan ge flera värden… nu… senare… och igen…
- Att Observable kräver att subscribe finns (eller att subscribe "slås på")
- Att router.events skickar ut flera events varje gång en navigation sker
- Att interna steg görs varje gång en navigation sker; varje steg skickas som ett event
- Att router.events.subscribe() lyssnar på alla routing-händelser
- Att event är ett paket med information, exempel på events är NavigationStart, RoutesRecognized, GuardsCheckStart, NavigationEnd, NavigationCancel, NavigationError
- Att console kan printa undefined eftersom det kan ta tid byta route (därför console omges av if-sats)
*/
