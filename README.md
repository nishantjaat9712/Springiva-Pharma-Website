# Springiva Pharma

Production-oriented pharmaceutical company website + admin CMS for **SPRINGIVA PHARMA**.

The design direction uses the supplied Sun Pharma site only as a benchmark for corporate pharmaceutical professionalism, content hierarchy, navigation quality and UX. It does **not** copy Sun Pharma branding, code, images, text or exact layouts.

## Stack

- Next.js + React + TypeScript
- Tailwind-ready architecture (custom CSS included for the premium visual system)
- Framer Motion
- PostgreSQL
- Prisma ORM
- Secure JWT admin session in an HTTP-only cookie
- bcrypt password hashing
- Zod validation
- Local product image upload for development
- SEO metadata, sitemap and robots.txt

## Features

### Public website

- Premium responsive home page
- Sticky transparent-to-solid navigation
- Animated reveal interactions
- Product portfolio
- Product search and category filtering
- Product detail pages
- Quality & manufacturing section
- Third-party manufacturing section
- Contact/enquiry form
- Responsive mobile navigation
- SEO metadata
- Sitemap and robots
- Accessible form controls
- Regulatory-safe wording and placeholders

### Admin CMS

Routes:

- `/admin`
- `/admin/login`
- `/admin/medicines`
- `/admin/medicines/add`
- `/admin/medicines/edit/[id]`
- `/admin/prices`
- `/admin/enquiries`
- `/admin/settings`

Admin capabilities:

- Secure login
- Dashboard statistics
- Add/edit/deactivate medicines
- Search medicines
- Categories
- Product image uploads
- MRP/current price editing
- Historical price changes
- Enquiry inbox

## Quick start

### 1. Install

```bash
npm install
```

### 2. Start PostgreSQL

Using Docker:

```bash
docker compose up -d
```

### 3. Create environment file

Copy `.env.example` to `.env`.

Change at minimum:

```env
JWT_SECRET="a-long-random-secret"
ADMIN_PASSWORD="your-strong-password"
```

### 4. Create database schema

```bash
npx prisma generate
npx prisma db push
```

### 5. Seed admin + sample products

```bash
npm run db:seed
```

### 6. Run

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

The seeded admin credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Sample products

The seed includes the four products supplied in the brief:

1. PRIMOXY™-625 — Amoxicillin 500 mg + Clavulanic Acid 125 mg
2. ACEIVA SP — Aceclofenac + Paracetamol + Serratiopeptidase
3. MONTENIA™ L — Montelukast + Levocetirizine
4. PANKAZ-D — Pantoprazole + Domperidone

Pack sizes, prices, manufacturer details and approved product information are intentionally placeholders until verified information is supplied.

## Product data management

You do not need to edit source code when a medicine changes.

Use:

`Admin → Medicines`

to add/edit products.

Use:

`Admin → Price Management`

to change MRP/current price. Each price update is inserted into `PriceHistory`, so previous values are retained.

## Image uploads

Development uploads are stored in:

`public/uploads/`

Accepted formats:

- JPG/JPEG
- PNG
- WEBP

Maximum file size: 5 MB.

For production, use object storage such as S3-compatible storage or another managed media service rather than relying on the application filesystem.

## Security

Implemented:

- Password hashing with bcrypt
- HTTP-only secure admin cookie
- Protected admin routes
- Zod server-side validation
- Prisma parameterized database access
- Image MIME/size validation
- Security response headers
- No secrets in frontend code

For a high-traffic production deployment, add:

- Redis-backed rate limiting
- Centralized object storage
- Security monitoring/logging
- Email provider for enquiry notifications
- WAF/CDN
- Database backups
- Strong CSP tuned for your deployed domains

## Production deployment

Recommended:

1. Deploy Next.js to a Node-compatible hosting platform.
2. Provision managed PostgreSQL.
3. Set production environment variables.
4. Run `prisma generate`.
5. Apply migrations in a controlled release process.
6. Use object storage for images.
7. Set `NEXT_PUBLIC_SITE_URL`.
8. Configure a transactional email service for enquiry notifications.
9. Enable HTTPS.
10. Add monitoring and database backups.

For production schema changes, prefer:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```

instead of using `prisma db push` as the release mechanism.

## Important pharmaceutical content rule

Do not publish unsupported:

- Certifications
- Regulatory approvals
- Manufacturing facilities
- Clinical claims
- Medical benefits
- Product indications
- Government approvals
- Awards
- Company statistics

Every medicine's approved product information should be verified before publication.

## Reference

The supplied brief asked for the professional level and information architecture of Sun Pharma to be used as a visual/structural reference. The implementation intentionally uses original Springiva Pharma branding and UI patterns.
