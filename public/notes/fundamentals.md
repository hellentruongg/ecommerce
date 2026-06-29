# Grunder

## Vad är Node.js?

Node.js är ett program som används för att bytta webbservrar och API:er.

## Varför behövs node.js?

Angular körs i webbläsaren men använder verktyg som körs i Node.js.

**Exempel på verktyg:**

- Kompilera av TypeScript till JavaScript
- Starta en lokal utvecklingsserver
- Installera kommando, bibliotek och paket (via npm)

Alltså behövs Node.js för att utveckla och bygga Angular-projekt.

## Vad är npm?

Angular använder många externa paket och npm är ett sätt att installera alla paket som behövs för projektet.

**Exempel på paket:**

- Angulars egna bibliotek
- RxJS
- TypeScript
- Testverktyg

npm används även för att uppdatera paketen. Alltså är npm ett pakethanterare, den har en lista på alla paket och håller koll på versionen.

Notera att npm följer med Node.js.

**Exempel på Angulars egna bibliotek:**

- Core för att skapa komponenter, injicera tjänster (services) och använda livscykler
- Router för att skapa SPA, hantera URL:er och byta sida utan att ladda om webbläsaren
- Forms för att hantera formulärer och validering
- HTTP för att prata med servrar/API:er
- Test för att testa kod

## Vad är Angular cli?

Angular cli är ett kommandoverktyg som gör det enkelt och snabbt att bygga Angular-projekt. Utan det behöver utvecklaren konfigurera eller sätta upp mycket manuellt, t.ex man kan skapa mappar och filer snabbt.

## Vad är SPA (Single Page Application)?

SPA är en typ av webbapplikationen som laddas som en enda sida i webbläsaren. Sidans innehåll uppdateras dynamiskt utan att sidan laddas om helt.

Alltså är det själva innehållet som byts ut istället för att ladda ny sida varje gång.

Router gör det möjligt att skapa SPA.

## Vad är databas?

Databas är en plats för att lagra information.

## Vad är API (Application Programming Interface)?

API är ett sätt för olika program att prata med varandra. API kan ses som en lista på saker de kan göra eller fråga om, t.ex hämta information om en artist.

Notera att http är språket på nätet. HTTP beskriver hur information skickas över nätet, t.ex hur frågan ska formuleras och hur svaret ska se ut.

## Vad är server?

Server är ett program som hanterar förfrågningar och levererar information hämtad från databasen. Den kan också spara information i databasen.

## Vad är Postman?

Postman är ett verktyg för att testa API:er. Alltså används verktyget för att se hur API fungerar.

## Vad är JSON-server?

JSON-server är ett verktyg som används för att skapa fejk API från en vanlig JSON-fil.

Alltså fungerar JSON-filen som en databas.

## Vad är auth-guard?

Auth-guard är ett sätt att skydda sidor från obehöriga, t.ex endast inloggad användare kan komma åt sin kontosida.

## Vad är eventemitter?

Eventemitter är ett sätt för en komponent att skicka information till sin förälderkomponent.

```typescript
@Component({
  selector: "app-child",
  template: `<button (click)="sendMessage()">Klicka mig</button>`,
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit("Hej från barnet!");
  }
}
```

[!NOTE] @Output gör att föräldern kan lyssna på eventet, EventEmitter<string> betyder att eventet skickar en text (string) och .emit() skickar själva datan.

```typescript
<app-child (messageEvent)="handleMessage($event)"></app-child>

<p>{{ message }}</p>
```

[!NOTE] Föräldern hanterar datan från barnet.
