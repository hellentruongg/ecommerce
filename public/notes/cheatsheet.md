# Router

Enkel guide för att sätta igång med router

## Byta sidor

### 1. Skapa routes

```typescript
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "seller-auth", component: SellerAuthComponent },
];
```

### 2. Binda routes med länkar

```html
<ul class="nav__links">
  <li class="nav__link">
    <a routerLink="/seller" class="nav__link-txt">Seller</a>
  </li>
  <li class="nav__link"><a routerLink="/">Home</a></li>
  <li class="nav__link"><a href="#">Login</a></li>
  <li class="nav__link"><a href="#">Cart(0)</a></li>
</ul>
```

[!NOTE]
Det går att utesluta / .

### 3. Visa dynamiskt innehåll

```html
<router-outlet></router-outlet>
```

[!NOTE]
Det fungerar mer som en dörr som gör det möjligt att gå ut (synlig) och gå in (dold).

[!IMPORTANT]
Det är inte ett DOM-element.

## Skydda sidor från obehöriga (inloggning)

### 1. Skapa auth-guard fil

```terminal
Skriv: ng g auth-guard
Välj: CanActivate
```

[!NOTE]
Auth-guard filen returnerar true eller false, där true innebär att man kan komma åt sidan och false att man _inte_ kan komma åt sidan.

### 2. Koppla route till auth-guard

```typescript
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "seller-auth", component: SellerAuthComponent },
  { path: "seller-account", component: SellerAccountComponent, canActivate: [AuthGuard] },
];
```

### 3. Autentisera användare

```typescript
logIn(data: Login): void {
    this.sellerService.logIn(data).subscribe((result: any) => {
      if (result.length === 1) {
        // localStorage.setItem('seller', JSON.stringify(result[0]));
        this.sellerService.user = result[0];
        this.router.navigate(['seller-account']);
      }
    });
  }
```

[!NOTE]
Om data fångas så finns användaren. Om datan inte finns returneras en tom array.

[!IMPORTANT]
Användaren flyttas inte till sidan direkt, då AuthGuard måste göra sin kontroll först.

```typescript
const seller = sellerService.user;

if (seller) {
  return true;
} else {
  router.navigate(["seller"]);
  return false;
}
```

[!NOTE]
AuthGuard körs när man navigerar med router eller när man skriver URL direkt i browsern.

### 4. Behåll sida vid refresh

```typescript
reloadPage() {
    const seller = localStorage.getItem('seller');

    if (seller) {
      this.router.navigate(['seller-account']);
    }
  }
```

```typescript
ngOnInit(): void {
    this.sellerService.reloadPage();
  }
```

[!NOTE]
I ngOnInit kan komponenten veta vilken sida den behöver visa.

[!IMPORTANT]
När man refreshar sidan laddas komponenten på nytt.

# Form

## Hantera data från formulär

### 1. Skapa formulärobjekt

```html
<form #myForm="ngForm">...</form>
```

[!NOTE]
Symbolen # är ett sätt att <br>
(1) spara ett specifikt DOM-element i en variabel för att sedan kunna referera till elementet och komma åt dess attributer, och <br>
(2) referera till ett direktiv som **ngForm** som säger till Angular att skapa ett formulärobjekt.

### 2. Koppla input-fält till formulärobjektet

```html
<form #myForm="ngForm">
  <input name="username" ngModel />
  <button type="submit">Skicka</button>
</form>
```

[!NOTE]
ngModel säger till Angular att input-fältet tillhör formulärobjektet.

[!IMPORTANT]
**name** är ett attribut som måste finnas då input-värdet sparas i attributet.

### 3. Komma åt formulärdata

```html
<form #myForm="ngForm" (ngSubmit)="submit(myForm.value)">
  <input name="username" ngModel />
  <button type="submit">Skicka</button>
</form>
```

[!NOTE]
Alla input-värden sparas i **value** i formulärobjektet.

## Integrera API i formulär

### 1. Skapa förfrågan till API

```typescript
  signUp(data: any) {
    return this.httpClient.post('http://localhost:3000/seller', data);
  }
```

[!NOTE]
API-anrop returnerar en Observable som ger data över tid. Anropet bör finnas i en service-fil.

### 2. Hantera svaret från förfrågan

```typescript
 submit(data: any): void {
    console.warn(data);

    this.sellerService.signUp(data).subscribe((result) => {
      console.warn(result);
    });
  }
```

[!NOTE]
Subscribe fångar upp inkommande data och hanterar datan genom att köra en callback fn som man definierar.

[!IMPORTANT]
Observable vet inte vart datan ska levereras, därför måste subscribe finnas. Utan subscribe kan svaret från api-anropet inte hanteras.

### 3. Skapa egen datatyp

```typescript
export interface signUp {
  name: string;
  email: string;
  password: string;
}
```

[!NOTE]
Datatypen "any" ersätts med interface "signUp" i funktionerna i steg 1-2.

[!IMPORTANT]
Any är inte bra för att......
