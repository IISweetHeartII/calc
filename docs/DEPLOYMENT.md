# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub repository connected
- Vercel account (free tier available)

### Initial Setup

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project**

   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   ```

3. **Environment Variables** (if needed)
   - Add environment variables in Vercel dashboard
   - Example: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADSENSE_ID`

4. **Domain Setup**
   - Add custom domain: `calc.log8.kr`
   - Update DNS settings:
     ```
     Type: CNAME
     Name: calc
     Value: cname.vercel-dns.com
     ```

### Deployment Workflow

**Automatic Deployment:**

- Push to `main` → Production deployment
- Push to other branches → Preview deployment

**Manual Deployment:**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Build Optimization

### Environment Variables

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_ADSENSE_ID=your-adsense-id
```

**Vercel Environment Variables:**

- Production: Set in Vercel dashboard
- Preview: Automatic from branch

### Performance Optimization

**Image Optimization:**

```typescript
import Image from "next/image";

<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={200}
  priority
/>
```

**Bundle Analysis:**

```bash
pnpm add -D @next/bundle-analyzer

# Update next.config.ts
```

### SEO Configuration

**Metadata (app/layout.tsx):**

```typescript
export const metadata: Metadata = {
  title: "탈출각 - 투자 계산기",
  description: "물타기 계산, 목표 평단가 역산",
  openGraph: {
    title: "탈출각",
    description: "투자 계산기",
    url: "https://calc.log8.kr",
    siteName: "탈출각",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

**sitemap.xml:**

```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: "https://calc.log8.kr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

**robots.txt:**

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://calc.log8.kr/sitemap.xml",
  };
}
```

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:

- Web Analytics (free)
- Speed Insights (free)

### Google Analytics 4

```typescript
// app/layout.tsx
import Script from "next/script";

export default function RootLayout() {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Google AdSense

```typescript
// components/AdSense.tsx
export function AdSense() {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot="your-slot-id"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
```

## Rollback

### Vercel Dashboard

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### CLI

```bash
vercel rollback
```

## Troubleshooting

### Build Failures

**Check build logs:**

- Vercel dashboard → Deployments → Build Logs

**Common issues:**

```bash
# Type errors
pnpm typecheck

# Linting errors
pnpm lint:fix

# Missing dependencies
pnpm install
```

### Domain Issues

**Verify DNS settings:**

```bash
dig calc.log8.kr
nslookup calc.log8.kr
```

**Vercel SSL:**

- Automatic SSL certificate
- Usually takes 5-10 minutes after domain setup

## Performance Checklist

- [ ] Enable Vercel Analytics
- [ ] Configure Google Analytics
- [ ] Set up custom domain
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Optimize images with next/image
- [ ] Enable gzip/brotli compression (automatic)
- [ ] Set proper Cache-Control headers
- [ ] Monitor Core Web Vitals
