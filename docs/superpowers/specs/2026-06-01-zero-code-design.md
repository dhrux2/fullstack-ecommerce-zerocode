# ZERO CODE — Full-Stack Premium Clothing E-Commerce Platform Spec

## Metadata
* **Project Name:** ZERO CODE
* **Date:** 2026-06-01
* **Stack:** Next.js (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis Smooth Scroll, Zustand, Prisma ORM, Supabase (Auth + Storage), Stripe Payments (Test Mode)

---

## 1. Brand Guidelines & Visual System (Strict)

### Fonts
* **Display / Hero Headings:** Bebas Neue (All-caps, tracking `0.02em`–`0.08em`)
* **UI / Labels / Nav / Buttons:** Space Grotesk (Weights 500–700, tracking `0.1em`–`0.3em`, uppercase)
* **Body / Descriptions:** DM Sans (Weight 300–400, relaxed line-height `1.6`–`1.7`)

### Colors
* **Primary Black / Obsidian:** `#0A0A0A`
* **Background Cream / Parchment:** `#F5F4F0`
* **Pure White:** `#FFFFFF`
* **Deep Graphite:** `#2C2C2C`
* **Mid Stone:** `#6B6B6B`
* **Warm Ash:** `#B8B5AD`
* **Bone:** `#E8E5DE`
* **Signal Red (CTAs, alerts, sale tags only):** `#C8372D`
* **Raw Umber (Premium badges only):** `#8B6914`

### Styling Rules
* **No border-radius anywhere:** 100% sharp edges, raw, boxy luxury feel.
* **No gradients, no drop shadows.**
* **Borders:** 1px solid (`#E8E5DE` for subtle panels, `#0A0A0A` for structural highlights).
* **Grid Gaps:** Use `bg-[#E8E5DE]` on the container with child items having `bg-[#F5F4F0]` or `bg-[#FFFFFF]` to create clean, razor-sharp 1px border gridlines naturally instead of individual card borders.
* **Indian Rupees:** Prices must use `₹` in Space Grotesk font-weight 600.
* **Section Headers:** 10px Space Grotesk, letter-spacing `0.3em`, uppercase, color `#6B6B6B`.

---

## 2. Animation Specification (GSAP + Lenis)

### Lenis Smooth Scroll
* Wraps the entire application storefront. Coordinates with GSAP ScrollTrigger to ensure zero jitter.
* Configured with moderate damping (`lerp: 0.1`, `smoothWheel: true`) to feel heavy, controlled, and luxurious.

### Preloader
* Fullscreen cover counting `00` to `100` in heavy Bebas Neue. On complete, unmasks the hero.

### Core GSAP Wrappers
1. **Masked Reveal:** Slide/clip-path unmasking animation on scroll entry (`clipPath: polygon(0 0, 100% 0, 100% 100%, 0 100%)`).
2. **Kinetic Stagger:** entrance stagger for grids (`y: 80`, `opacity: 0`, `duration: 1`, `stagger: 0.15`, `ease: "power3.out"`).
3. **Scrollytelling Text:** Scroll-triggered letter tracking/revelations.
4. **Infinite Marquee:** 60fps horizontal infinite loop for announcements.

---

## 3. Database Schema (Prisma)

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String     @id // Supabase Auth User UUID
  email     String     @unique
  name      String?
  role      Role       @default(CUSTOMER)
  orders    Order[]
  cartItems CartItem[]
  createdAt DateTime   @default(now())
}

enum Role {
  CUSTOMER
  ADMIN
}

model Product {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  description String
  price       Float
  images      String[]    // Static local /photos/ paths or Supabase Storage bucket URLs
  sizes       String[]
  category    String
  stock       Int         @default(0)
  featured    Boolean     @default(false)
  orderItems  OrderItem[]
  cartItems   CartItem[]
  createdAt   DateTime    @default(now())
}

model Order {
  id         String      @id @default(cuid())
  userId     String
  user       User        @relation(fields: [userId], references: [id])
  items      OrderItem[]
  status     OrderStatus @default(PENDING)
  total      Float
  stripeId   String?
  createdAt  DateTime    @default(now())
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  size      String
  price     Float
}

model CartItem {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  size      String
}
```

---

## 4. Key Integrations

### User Synchronization (Just-in-Time)
* Done in protected middleware/backend helpers. Checks database on request; inserts if Supabase UUID is not found.

### Storage (Supabase)
* Cloudinary is removed. Product images uploaded in `/admin` go to Supabase storage bucket `zero-code-products`.

### Payments (Stripe)
* `/api/checkout/payment-intent` registers user transaction. Webhook handles post-purchase state sync.
