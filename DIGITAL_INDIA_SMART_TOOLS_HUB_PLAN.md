# Digital India Smart Tools Hub — Quick Plan

## 1. Vision

One web hub where Indian citizens, students and small businesses find simple, free, privacy-friendly tools for everyday "Digital India" tasks: documents, IDs, payments, government schemes and local services, in English and Hindi first.

## 2. Target users

| User | Main need |
|------|-----------|
| Citizens | Check document formats, find schemes, calculate fees and taxes |
| Students | Resize photos and signatures for exam forms, convert files to PDF |
| Small businesses / MSMEs | GST calculator, invoice generator, UPI QR code |
| CSC / cyber-café operators | A fast toolkit for daily form-filling work |

## 3. MVP tool set (Phase 1)

**Document tools (run in the browser, so no file is uploaded)**
- Photo and signature resizer with presets (SSC, UPSC, NEET, passport and others: size in KB, pixels, background)
- Image to PDF, PDF merge/split, PDF compress
- DigiLocker-ready file format checker

**Finance tools**
- GST calculator (inclusive/exclusive, CGST/SGST/IGST split)
- Income-tax regime comparator (old vs new)
- EMI / SIP / PPF / FD calculators
- UPI QR code generator (from a VPA and amount)

**Validators and utilities (format checks only, no lookups against government data)**
- PAN, GSTIN, IFSC and PIN code format validators
- Aadhaar masker (blur the first 8 digits on an image)
- Age / date calculator for eligibility cut-off dates

**Information hub**
- Searchable directory of government schemes and portals (category, state, eligibility)
- Links to official services (DigiLocker, UMANG, eSign, ePFO, Passport Seva)

## 4. Architecture (reuses this repo's stack)

The existing `Simform Practicle` app already provides Angular, Node/Express, MongoDB, JWT auth, route guards and a CRUD service. The hub can grow from that:

```
Angular SPA (tools run on the client)
   ├── /tools/:category/:slug   -> lazy-loaded tool modules
   ├── /schemes                 -> scheme directory (search + filters)
   └── /account                 -> saved tools, history (existing JWT auth)
Node/Express API
   ├── /api/tools      (tool catalog metadata: name, category, tags, i18n)
   ├── /api/schemes    (CRUD, reusing the product CRUD pattern)
   └── /api/auth       (existing login/register)
MongoDB: tools, schemes, users, feedback
```

**Key decisions**
- **Client-side processing first:** handle images and PDFs in the browser (`pdf-lib`, canvas, `browser-image-compression`) so personal documents never leave the device. This is the main trust and privacy selling point.
- **Upgrade Angular 7 → current LTS** before building new features: standalone components, lazy routes and SSR for SEO.
- **i18n:** Angular i18n or `ngx-translate`, starting with EN + HI and adding regional languages later.
- **PWA:** offline support for client-side tools, which matters on low bandwidth.
- **Accessibility:** follow GIGW / WCAG 2.1 AA.

## 5. Roadmap

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| 0. Foundation | Weeks 1–2 | Angular upgrade, design system, tool-registry pattern, CI, hosting |
| 1. MVP | Weeks 3–6 | 10–12 tools from section 3, EN/HI, PWA, basic analytics |
| 2. Hub | Weeks 7–10 | Scheme directory + admin CRUD, user accounts (saved tools), feedback |
| 3. Growth | Weeks 11–16 | Regional languages, SEO pages per tool, invoice generator, API integrations (e.g. DigiLocker partner APIs if approved) |

## 6. Success metrics

- Monthly active users and tool runs per user
- Share of traffic from organic search (one SEO landing page per tool)
- Lighthouse scores: performance ≥ 90, accessibility ≥ 95
- Tool success rate (completed outputs ÷ starts)

## 7. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Handling sensitive IDs (Aadhaar, PAN) | Process on the client only, store no documents, publish a clear privacy policy that complies with the DPDP Act 2023 |
| Being mistaken for an official government site | Clear "not affiliated" disclaimer, no government emblems, link to official portals |
| Exam presets going out of date | Store presets as data in MongoDB and let admins edit them |
| Legacy Angular 7 code base | Upgrade in Phase 0 before adding features |

## 8. Immediate next steps

1. Confirm the MVP tool list and target languages.
2. Upgrade the Angular project and set up the tool-registry module structure.
3. Build the first two tools (photo/signature resizer, GST calculator) as templates for the rest.
4. Seed the scheme directory with about 50 central schemes.
