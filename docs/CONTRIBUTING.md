# Contributing Guide

## Welcome!

Thank you for considering contributing to 탈출각 (Clac)!

## How to Contribute

### Reporting Bugs

**Before submitting:**

- Check existing issues
- Verify you're on the latest version
- Collect error logs and screenshots

**Bug report should include:**

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (browser, OS, Node version)

### Suggesting Features

Open an issue with:

- Use case description
- Expected behavior
- Why this feature would be useful
- Proposed implementation (optional)

### Code Contributions

#### 1. Fork & Clone

```bash
# Fork on GitHub first, then:
git clone git@github.com:YOUR_USERNAME/calc.git
cd calc
```

#### 2. Setup

```bash
pnpm install
pnpm dev
```

#### 3. Create Branch

```bash
git checkout -b feature/your-feature-name
```

#### 4. Make Changes

Follow our code style:

- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Write meaningful commit messages

#### 5. Test

```bash
pnpm typecheck
pnpm lint
pnpm build
```

#### 6. Commit

```bash
git add .
git commit -m "feat: add new feature"
```

Commit message format:

```
<type>: <subject>

<body (optional)>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### 7. Push & PR

```bash
git push origin feature/your-feature-name
```

Create Pull Request on GitHub with:

- Clear title and description
- Reference related issues
- Screenshots (if UI changes)

## Code Review Process

1. CI checks must pass
2. Code review by maintainer
3. Address feedback
4. Approval and merge

## Style Guide

### TypeScript

```typescript
// Good: Descriptive names
interface CalculatorResult {
  averagePrice: number;
  totalQuantity: number;
}

// Bad: Abbreviated names
interface Result {
  avg: number;
  qty: number;
}
```

### React Components

```typescript
// Good: Functional component with types
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// Bad: No types
export function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### File Naming

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`utils.ts`)
- Constants: UPPER_SNAKE_CASE in file, camelCase filename

### Import Order

1. React/Next.js
2. Third-party libraries
3. Internal components
4. Internal utilities
5. Types
6. Styles

```typescript
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalculatorProps } from "@/types";

import styles from "./Calculator.module.css";
```

## Documentation

- Update README.md for user-facing changes
- Update docs/ for developer changes
- Add JSDoc comments for complex functions

```typescript
/**
 * Calculate average purchase price
 * @param purchases - Array of purchase transactions
 * @returns Average price per unit
 */
function calculateAveragePrice(purchases: Purchase[]): number {
  // Implementation
}
```

## Questions?

- Open an issue with "question" label
- Check existing documentation first

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Code of Conduct

Be respectful and constructive. We're all here to learn and improve.
