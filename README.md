# 탈출각 (Clac)

투자 계산기 - 물타기 계산, 목표 평단가 역산 등 투자자를 위한 유틸리티

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Package Manager:** pnpm 10
- **Code Quality:** ESLint 9 + Prettier 3
- **Git Hooks:** Husky 9 + lint-staged
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Available Scripts

```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint errors
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting
pnpm typecheck     # Run TypeScript type check
```

## Project Structure

```
clac/
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   │   └── ui/     # Reusable UI components
│   ├── lib/        # Utility functions
│   ├── types/      # TypeScript type definitions
│   └── constants/  # Global constants
├── public/         # Static assets
└── .github/
    └── workflows/  # GitHub Actions CI/CD
```

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Pre-commit hooks will automatically run:
   - Prettier formatting
   - ESLint checking
4. Push to GitHub (CI will run automatically)
5. Create a Pull Request

## CI/CD

GitHub Actions automatically runs on push/PR:

- ESLint check
- Prettier check
- TypeScript type check
- Build verification

## Deploy

Vercel deployment: TBD

## License

Private project
