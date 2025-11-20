# Architecture

## Overview

탈출각(Clac)은 Next.js 16 App Router를 기반으로 한 클라이언트 사이드 투자 계산기입니다.

## Technology Stack

### Core

- **Framework**: Next.js 16.0.3 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5
- **Package Manager**: pnpm 10.22.0

### Styling

- **CSS Framework**: Tailwind CSS 4
- **UI Library**: shadcn/ui (planned)
- **Utility**: clsx + tailwind-merge

### Code Quality

- **Linter**: ESLint 9 (Flat Config)
- **Formatter**: Prettier 3.6.2
- **Git Hooks**: Husky 9 + lint-staged

### CI/CD

- **Platform**: GitHub Actions
- **Deployment**: Vercel (planned)

## Project Structure

```
clac/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   └── globals.css  # Global styles
│   │
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── calculator/  # Calculator components (planned)
│   │
│   ├── lib/             # Utilities
│   │   └── utils.ts     # cn() helper
│   │
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   │
│   └── constants/       # Global constants
│       └── index.ts
│
├── public/              # Static assets
│   └── images/          # Image files
│
├── docs/                # Documentation
│
└── .github/
    └── workflows/       # CI/CD workflows
        └── ci.yml
```

## Design Principles

### Client-Side Only

- No backend server
- All calculations performed in browser
- localStorage for persistence (optional)

### Performance First

- Static generation where possible
- Client-side rendering for interactive components
- Minimal bundle size

### SEO Optimized

- Server-side metadata generation
- Open Graph tags for social sharing
- Semantic HTML structure

## Data Flow

```
User Input → Calculator Component → Calculation Logic → Result Display
                                   ↓
                              localStorage (optional)
```

## Future Considerations

### Potential Enhancements

- [ ] PWA support for offline usage
- [ ] Export results as image/PDF
- [ ] Multiple calculator types
- [ ] Historical calculation tracking
- [ ] Share calculation results

### Monetization

- [ ] Google AdSense integration
- [ ] Affiliate links (증권사, 거래소)
- [ ] Premium features (planned)
