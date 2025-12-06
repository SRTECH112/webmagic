# WebMagic PH Portfolio

A responsive business portfolio website built with Next.js 14+, Tailwind CSS, and Framer Motion.

## Tech Stack

### Frontend
- **Next.js 14+ (App Router)**
- **TypeScript**
- **Tailwind CSS** (v4)
- **Framer Motion** (Animations)
- **Shadcn UI** (Components)
- **React Hook Form** (Forms)
- **Lucide React** (Icons)

### Backend
- **Next.js API Routes** (Route Handlers)
- **Supabase** (PostgreSQL Database)
- **Resend** (Email API)
- **Zod** (Validation)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret!)
- `RESEND_API_KEY` - Your Resend API key
- `ADMIN_EMAIL` - Email address for lead notifications

### 3. Set up Supabase database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL from `supabase-schema.sql` to create tables

### 4. Set up Resend (Email)

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. (Optional) Verify your domain for production emails

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
/src
├── /app
│   ├── /api              # API route handlers
│   │   ├── /leads        # Lead submission endpoint
│   │   └── /portfolio    # Portfolio CRUD endpoints
│   ├── /about
│   ├── /contact
│   ├── /portfolio
│   └── /services
├── /components           # React components
│   └── /ui               # Shadcn UI components
├── /data                 # Mock data
└── /lib                  # Utilities
    ├── email.ts          # Resend email utility
    ├── rate-limit.ts     # Rate limiting
    ├── supabase.ts       # Supabase client
    ├── utils.ts          # General utilities
    └── validations.ts    # Zod schemas
```

## API Endpoints

### Leads
- `POST /api/leads` - Submit a new lead (rate limited)
- `GET /api/leads` - Get all leads (admin)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Create portfolio item (admin)
- `GET /api/portfolio/[id]` - Get single portfolio item
- `PUT /api/portfolio/[id]` - Update portfolio item (admin)
- `DELETE /api/portfolio/[id]` - Delete portfolio item (admin)

## Features

- **Responsive Design:** Mobile-first approach
- **Dark Mode:** Toggle between light and dark themes
- **Animations:** Smooth transitions with Framer Motion
- **Contact Form:** Multi-step form with validation
- **Portfolio:** Dynamic filtering and detail pages
- **Rate Limiting:** Basic protection against spam
- **Email Notifications:** Automatic admin alerts for new leads

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
3. Deploy!

### 3. Update Resend domain (Production)

For production, update the `from` email in `src/lib/email.ts` to use your verified domain:

```typescript
from: "WebMagic PH <hello@yourdomain.com>"
```

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - never expose it client-side
- Rate limiting is in-memory and resets on server restart (use Redis for production)
- Add authentication for admin endpoints in production
