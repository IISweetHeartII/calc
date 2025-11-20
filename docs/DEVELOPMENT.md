# Development Guide

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Git

### Initial Setup

```bash
# Clone repository
git clone git@github.com:IISweetHeartII/calc.git
cd calc

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write code in `src/` directory
- Follow TypeScript and ESLint rules
- Use Prettier for formatting (automatic on save)

### 3. Run Quality Checks

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format check
pnpm format:check

# Auto-fix formatting
pnpm format
```

### 4. Commit

```bash
git add .
git commit -m "feat: add new calculator feature"
```

**Commit message format:**

```
<type>: <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Pre-commit hooks will automatically:

- Run Prettier
- Run ESLint
- Block commit if there are errors

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start development server (Turbopack) |
| `pnpm build`        | Build for production                 |
| `pnpm start`        | Start production server              |
| `pnpm lint`         | Run ESLint                           |
| `pnpm lint:fix`     | Auto-fix ESLint errors               |
| `pnpm format`       | Format code with Prettier            |
| `pnpm format:check` | Check code formatting                |
| `pnpm typecheck`    | Run TypeScript type check            |

## Code Style

### TypeScript

- Use strict mode
- Avoid `any` (use `unknown` if necessary)
- Prefer interfaces over types for objects
- Use descriptive variable names

```typescript
// Good
interface CalculatorInput {
  currentPrice: number;
  quantity: number;
}

// Avoid
type Input = {
  p: number;
  q: number;
};
```

### React Components

- Use functional components
- Prefer named exports
- Use TypeScript for props

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Tailwind CSS

- Use utility classes
- Use `cn()` helper for conditional classes

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />
```

## Adding Dependencies

```bash
# Production dependency
pnpm add package-name

# Development dependency
pnpm add -D package-name
```

Always commit `pnpm-lock.yaml` with dependency changes.

## Testing (Planned)

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

## Troubleshooting

### Build Cache Issues

```bash
rm -rf .next
pnpm dev
```

### Type Errors

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

## CI/CD

GitHub Actions automatically runs on:

- Push to `main` or `develop`
- Pull requests to `main` or `develop`

CI checks:

1. ESLint
2. Prettier
3. TypeScript type check
4. Build

All checks must pass before merging.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
