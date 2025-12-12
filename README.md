# Terra Forte Bau Kft. - Prémium Játszótér Katalógus (P-001)

![Project Status](https://img.shields.io/badge/Status-Development-yellow)
![Version](https://img.shields.io/badge/Version-0.4.0--alpha-blue)
![Tech Stack](https://img.shields.io/badge/BlueNet-Védjegy%20Stack-indigo)

Ez a repozitórium tartalmazza a **Terra Forte Bau Kft.** hivatalos weboldalának forráskódját. A projekt egy modern, szerver-oldali renderelést (SSR) használó B2B termékkatalógus, amely önkormányzatok és intézmények számára mutatja be a cég prémium játszótéri eszközeit.

> **Figyelem:** A projekt fejlesztés alatt áll. A jelenlegi verzió még nem élesíthető (Production Ready).

---

## 🛠 1. Technológiai Stack (BlueNet Védjegy)

A projekt a "BlueNet Védjegy Stack" legfrissebb, teljesítményre optimalizált verziójára épül.

- **Keretrendszer:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Stílus & UI:**
  - [Tailwind CSS v4](https://tailwindcss.com/) (Új motor, konfiguráció a CSS-ben!)
  - **Catalyst UI Kit** (Application UI komponensek - _Shadcn helyett_)
  - **Heroicons** (Ikonkészlet - _Lucide helyett_)
- **Adatbázis & Backend:**
  - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (SQL adatbázis)
  - [Drizzle ORM](https://orm.drizzle.team/) (Típusbiztos adatbázis kezelés)
  - Server Actions (API route-ok helyett)
- **Funkciók:**
  - **Űrlapok:** React Hook Form + Zod
  - **Email:** Resend (Tranzakciós e-mailek)
  - **Lokalizáció:** Egyedi "Univerzális Nyelvi Komponens" (JSON szótárak)

---

## ☁️ 2. Infrastruktúra és Üzemeltetés

A projekt "hibrid" hoszting modellt használ a teljesítmény és az üzleti stabilitás érdekében.

| Szolgáltatás                        | Szolgáltató        | Felelős   | Megjegyzés                                                  |
| :---------------------------------- | :----------------- | :-------- | :---------------------------------------------------------- |
| **Domain** (`terrafortebau.hu`)     | **Magyar Hosting** | Ügyfél    | Az ügyfél fizeti. NS rekordok itt maradnak.                 |
| **Levelezés** (`@terrafortebau.hu`) | **Magyar Hosting** | Ügyfél    | MX rekordok maradnak. A levelezést a régi tárhely kezeli.   |
| **Weboldal & DB**                   | **Vercel (Pro)**   | Fejlesztő | A domain "A rekordja" (`76.76.21.21`) a Vercelre irányítva. |

**Költségmodell:** A Vercel havidíját a fejlesztő fizeti, és "Éves Üzemeltetési Díj" formájában hárítja tovább az ügyfélre.

---

## 💻 3. Fejlesztői Környezet Beállítása

### Telepítés és Konfiguráció

```bash
# 1. Klónozás
git clone [https://github.com/jozsef-kiss/terra-forte-project.git](git@github.com:jozsef-kiss/terra-forte-project.git)
cd terraforte-web
npm install

# 2. Környezeti változók (.env.local létrehozása a gyökérben)
# Kérd el a kulcsokat a projektvezetőtől!
# POSTGRES_URL="..."
# RESEND_API_KEY="..."
# NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# 3. Adatbázis szinkronizálása (Drizzle)
npm run db:push

# 4. Indítás
pnpm dev

## 📂 4. Állapot

### Jelenlegi Státusz (v0.4.0 Alpha)

- [x] **Alapok:** Next.js + Tailwind v4 + Catalyst UI.
- [x] **Statikus Oldalak:** Főoldal, Rólunk, Szolgáltatások.
- [x] **Backend:** Vercel Postgres + Drizzle bekötve.
- [x] **Lead Generálás:** Kapcsolat űrlap mentése DB-be és Email küldés.
- [ ] **Katalógus (Következő fázis):** Termék adatbázis, Seed script, Szűrőrendszer.

---

## ⚠️ Fontos Megjegyzések

1.  **Tailwind v4:** A `globals.css` tartalmazza a konfigurációt (`@import "tailwindcss";`).
2.  **Jiggle Fix:** A `html, body { overflow-x: hidden; }` beállítás kritikus a Catalyst menü miatt.
3.  **Adatbázis:** Sémamódosítás után mindig futtasd: `npm run db:push`.

## 📄 Licenc

Ez a szoftver a **Terra Forte Bau Kft.** tulajdona. Fejlesztő: **BlueNet**.
```
