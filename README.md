# ZeroCode - Full Stack E-Commerce Platform

A high-performance, luxury e-commerce platform engineered with a focus on fluid typography, zero-layout-shift UI, and secure API boundaries. 

Built and maintained by [Dhruv Upadhyay](https://dhruvupadhyay.com).

## Architecture & Tech Stack

This platform was built using modern full-stack web architecture to ensure seamless performance from the database layer to the interactive client UI.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with fully fluid typography grids (dynamic viewport scaling)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Optimized shopping bag sync)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Payments**: Stripe API (Server-side session construction)
- **Animations**: GSAP (Custom clip-path image reveals and bespoke cursor interactions)

## Engineering Highlights

### Bespoke Interaction Design
Instead of relying on heavy UI component libraries, the interface utilizes raw CSS grid calculations combined with **GSAP**. I implemented custom pointer interactions, magnetic buttons, and zero-latency image reveals using SVG clip-paths to ensure the user experience feels tactile, premium, and performant.

### Fluid Typography & Viewport Hydration
To avoid the jarring "snapping" effect of standard media queries, the global typography system uses dynamic `clamp()` formulas. This guarantees perfect text scaling across all devices without layout shifts, while utilizing multiple custom fonts (Thunder, Nohemi, Outfit).

### Robust API Boundaries & Inventory Integrity
The checkout system enforces strict boundaries between client state and server execution:
1. **Price Integrity**: The server entirely discards any client-provided price values. The final Stripe `unit_amount` is resolved strictly using a verified `productIds` lookup against our Prisma database.
2. **Mid-Session Validation**: If a product's stock count falls below the requested quantity during a checkout initialization, the server halts execution and bubbles up a `409 Conflict`, which the client handles gracefully with an inline UI notification instead of a crash.
3. **Webhook Security**: Incoming Stripe webhooks are rigorously verified against cryptographic signatures before mutating local database state, ensuring robust transaction tracking.

## Local Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fullstack-ecommerce-zerocode.git
   cd fullstack-ecommerce-zerocode
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate `.env.example` to `.env` (or create a `.env` file) and add your local Postgres/SQLite connection string alongside your Stripe secret keys.

4. **Initialize the Database:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the storefront in your browser.

---

*Designed and developed by [Dhruv Upadhyay](https://dhruvupadhyay.com)*
