# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**탈출각 (Clac)** - Investment calculator for averaging down calculations (물타기 계산) and target average price calculations. This is a client-side only Next.js application with no backend.

## Development Commands

### Essential Commands

```bash
pnpm dev           # Start dev server at http://localhost:3000
pnpm build         # Production build (runs typecheck automatically)
pnpm typecheck     # TypeScript type checking (no emit)
pnpm lint          # ESLint check
pnpm lint:fix      # Auto-fix ESLint issues
pnpm format        # Format all files with Prettier
pnpm format:check  # Check formatting without changes
```

### Package Management

- **Package Manager:** pnpm 10+ only (enforced via `packageManager` field)
- **Adding Dependencies:** `pnpm add <package>` or `pnpm add -D <package>`
- **Installing UI Components:** `pnpm dlx shadcn@latest add <component-name>`
  - Example: `pnpm dlx shadcn@latest add button`
  - Uses New York style, RSC enabled, neutral base color

### Pre-commit Hooks

Husky + lint-staged automatically run on every commit:

- Prettier formatting on all staged files
- ESLint auto-fix on `.{js,jsx,ts,tsx}` files

## Architecture

### State Management Pattern

**Zustand with Persistence:**

- Store location: `src/stores/*.ts`
- Pattern: Zustand store wrapped with `persist` middleware
- Only calculation history persists to localStorage (not form inputs)
- Storage key: `"calculator-storage"`
- History limit: Last 10 calculations only

```typescript
// Store pattern used throughout the app
export const useCalculatorStore = create<State>()(
  persist(
    (set) => ({
      /* state and actions */
    }),
    {
      name: "calculator-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }), // Selective persistence
    }
  )
);
```

### Component Architecture

**Three-layer structure:**

1. **Page Layer** (`src/app/page.tsx`)
   - Next.js App Router pages
   - Minimal logic, mostly composition

2. **Feature Components** (`src/components/calculator/*`)
   - Business logic components (Calculator, ResultCard)
   - Zustand store integration
   - Framer Motion animations
   - Form validation and error handling

3. **UI Components** (`src/components/ui/*`)
   - shadcn/ui components (New York style)
   - Radix UI primitives + Tailwind styling
   - Never modify directly - regenerate with `pnpm dlx shadcn@latest`

### Calculator Logic Pattern

**Pure functions in `src/lib/calculator.ts`:**

- All business logic as pure functions
- Comprehensive input validation with Korean error messages
- TypeScript interfaces for all inputs/outputs
- Number precision: `.toFixed(2)` for currency, `.toFixed(4)` for quantities

```typescript
// All calculator functions follow this pattern:
export function calculateSomething(input: Input): Result {
  // 1. Destructure input
  // 2. Validate (throw Error with Korean message)
  // 3. Calculate
  // 4. Return with proper precision
}
```

### Animation Patterns

**Framer Motion conventions:**

- All animations use `motion.*` components from `framer-motion`
- Standard pattern: `initial` → `animate` → `transition`
- Staggered children animations use `delayChildren` and `staggerChildren`
- Common transitions: `{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }`

## TypeScript Configuration

### Path Aliases

- `@/*` maps to `src/*` (configured in `tsconfig.json` and `components.json`)
- Import style: `import { X } from "@/components/ui/X"`
- Never use relative imports across directories

### Type Imports

ESLint enforces: `@typescript-eslint/consistent-type-imports`

```typescript
// Correct
import type { MyType } from "@/types";
import { myFunction, type MyType } from "@/lib/utils";

// Wrong
import { MyType } from "@/types";
```

## Styling System

### Tailwind CSS v4

- **No config file required** - Tailwind 4 doesn't use `tailwind.config.ts`
- CSS variables defined in `src/app/globals.css`
- `cn()` utility from `@/lib/utils` for conditional classes
- Prettier plugin handles class sorting automatically

### Color System

- Base: `neutral` (configured in `components.json`)
- CSS variables: `--primary`, `--secondary`, `--muted`, etc.
- Profit/loss conditional coloring: `text-green-600` / `text-red-600`

## Code Quality Standards

### ESLint Configuration (Flat Config)

- Modern ESLint 9 with flat config (`eslint.config.mjs`)
- TypeScript ESLint 8 with recommended rules
- **Do not use** `eslint-plugin-prettier` - run Prettier separately
- Unused vars with `_` prefix are allowed

### Formatting

- Prettier 3 with Tailwind plugin
- Config format: `prettier.config.mjs` (ES module, not JSON)
- `tailwindFunctions: ["cn", "cva"]` for proper class sorting
- **Do not add** `tailwindConfig` option (Tailwind v4 doesn't need it)

## Common Pitfalls

### Husky Setup

When adding the `prepare` script to `package.json`, ensure Husky is already installed:

```bash
pnpm add -D husky
pnpm exec husky init
# Then add "prepare": "husky" to scripts
```

### shadcn/ui Components

- Always check if `components.json` exists before running `init`
- Missing peer dependencies (like `class-variance-authority`) must be installed manually
- Never edit generated UI components - they should be regenerated instead

### Zustand Store Usage

- Use `partialize` for selective persistence (not all state should persist)
- History management: Always slice to prevent unlimited growth
- Client-side only: Ensure stores are only used in `"use client"` components

### Number Formatting

- Currency: Always use `formatCurrency()` for KRW display
- Percentages: Use `formatPercentage()` which adds `+/-` sign
- Never display raw numbers - always format for Korean locale

## Git Workflow

- Main branch: `main`
- Feature branches: Create from `main` for all work
- Commits: Descriptive messages with emoji support
- Pre-commit: Automated lint-staged checks (cannot be bypassed)
- CI/CD: GitHub Actions runs on all pushes (lint, format, typecheck, build)
