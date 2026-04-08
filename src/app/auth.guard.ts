import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sellerService = inject(SellerService);

  const seller = sellerService.user;

  if (seller) {
    return true;
  } else {
    router.navigate(['seller']);
    return false;
  }
};

/*
TÄNK PÅ
- Att en AuthGuard är en dörrvakt som står mellan användaren och en route och ställer en kontrollfråga med ja/nej svar
- Att ja kan sägas vara true och nej kan sägas vara nej
- Att AuthGuard körs när man navigerar med router eller när man skriver URL direkt i browsern
- Att AuthGuard är en vanlig funktion som automatisk får in route (= den route man försöker gå till) och state (= hela URL:en)
- Att inject() är en inbyggd Angular-funktion som används för att injicera dependency UTANFÖR klasser
*/
