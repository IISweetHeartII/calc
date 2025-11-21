# Libraries Usage Guide

## State Management - Zustand

### Overview

Zustand is a lightweight, fast state management solution for React with minimal boilerplate.

**Why Zustand over localStorage?**

- Type-safe state management
- Automatic persistence with middleware
- React hooks integration
- Better performance (no re-renders for non-subscribed components)
- Time-travel debugging support

### Installation

```bash
pnpm add zustand
```

### Basic Usage

#### Creating a Store

```typescript
// src/stores/calculator-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CalculatorState {
  currentPrice: number;
  setCurrentPrice: (price: number) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      currentPrice: 0,
      setCurrentPrice: (price) => set({ currentPrice: price }),
    }),
    {
      name: "calculator-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

#### Using in Components

```typescript
import { useCalculatorStore } from "@/stores/calculator-store";

export function Calculator() {
  const currentPrice = useCalculatorStore((state) => state.currentPrice);
  const setCurrentPrice = useCalculatorStore((state) => state.setCurrentPrice);

  return (
    <input
      type="number"
      value={currentPrice}
      onChange={(e) => setCurrentPrice(Number(e.target.value))}
    />
  );
}
```

#### Selecting Multiple Values

```typescript
// Good: Single subscription
const { currentPrice, currentQuantity } = useCalculatorStore((state) => ({
  currentPrice: state.currentPrice,
  currentQuantity: state.currentQuantity,
}));

// Also good: Separate subscriptions (only re-renders when specific value changes)
const currentPrice = useCalculatorStore((state) => state.currentPrice);
const currentQuantity = useCalculatorStore((state) => state.currentQuantity);
```

### Persistence

The store automatically persists to localStorage:

```typescript
{
  name: "calculator-storage",
  storage: createJSONStorage(() => localStorage),
  // Only persist specific fields
  partialize: (state) => ({ history: state.history }),
}
```

### Resources

- [Official Docs](https://zustand.docs.pmnd.rs/)
- [TypeScript Guide](https://zustand.docs.pmnd.rs/guides/typescript)
- [Persist Middleware](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)

---

## Icons - Lucide React

### Overview

Lucide is a beautiful, consistent icon set with 1000+ icons. It's a community-maintained fork of Feather Icons.

**Why Lucide?**

- Tree-shakeable (only bundle icons you use)
- Consistent design
- TypeScript support
- Easy to customize (size, color, stroke width)

### Installation

```bash
pnpm add lucide-react
```

### Basic Usage

```typescript
import { Calculator, TrendingUp, Trash2, Copy } from "lucide-react";

export function IconExample() {
  return (
    <div>
      <Calculator className="h-6 w-6 text-blue-500" />
      <TrendingUp className="h-4 w-4" strokeWidth={2} />
      <Trash2 size={20} color="red" />
      <Copy className="h-5 w-5" />
    </div>
  );
}
```

### Common Icons for Calculator

```typescript
import {
  Calculator, // Main calculator icon
  TrendingUp, // Profit/increase
  TrendingDown, // Loss/decrease
  DollarSign, // Currency
  BarChart, // Analytics
  RefreshCw, // Reset
  Copy, // Copy results
  Download, // Export
  Trash2, // Delete
  Info, // Information
  Settings, // Settings
  Share2, // Share
  History, // Calculation history
  ArrowUpDown, // Sort
} from "lucide-react";
```

### With Tailwind CSS

```typescript
<Calculator className="h-6 w-6 text-slate-700 dark:text-slate-200" />
<TrendingUp className="h-4 w-4 text-green-500 animate-bounce" />
```

### Resources

- [Official Docs](https://lucide.dev/)
- [Icon Browser](https://lucide.dev/icons/)
- [GitHub](https://github.com/lucide-icons/lucide)

---

## Animations - Framer Motion

### Overview

Framer Motion is a production-ready animation library for React with a simple, declarative API.

**Why Framer Motion?**

- Declarative animations
- Gesture support (drag, hover, tap)
- Layout animations (automatic position changes)
- SVG animations
- Server-side rendering support

### Installation

```bash
pnpm add framer-motion
```

### Basic Usage

#### Simple Animations

```typescript
import { motion } from "framer-motion";

export function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

#### Hover and Tap Animations

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-4 py-2 bg-blue-500 text-white rounded"
>
  Calculate
</motion.button>
```

#### Variants (Reusable Animations)

```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, x: -100 },
};

<motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
  Result Card
</motion.div>;
```

#### Layout Animations

```typescript
<motion.div layout className="result-card">
  {/* Content automatically animates when layout changes */}
</motion.div>
```

#### Stagger Children

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item}>Item 1</motion.li>
  <motion.li variants={item}>Item 2</motion.li>
  <motion.li variants={item}>Item 3</motion.li>
</motion.ul>;
```

### Calculator-Specific Examples

#### Result Reveal Animation

```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="result-container"
>
  <h3>Average Price: {result.averagePrice}</h3>
</motion.div>
```

#### Number Counter Animation

```typescript
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  return <motion.span>{display}</motion.span>;
}
```

#### Delete Animation

```typescript
<motion.div
  initial={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -100 }}
  transition={{ duration: 0.3 }}
>
  History Item
</motion.div>
```

### Performance Tips

```typescript
// Good: Use transform and opacity (GPU-accelerated)
<motion.div animate={{ x: 100, opacity: 0.5 }} />

// Avoid: Animating layout properties
<motion.div animate={{ width: 200, height: 300 }} />

// Use layout animations instead
<motion.div layout />
```

### Resources

- [Official Docs](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)
- [Animation Guide](https://www.framer.com/motion/animation/)

---

## Combined Example

### Animated Calculator Component

```typescript
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Trash2 } from "lucide-react";
import { useCalculatorStore } from "@/stores/calculator-store";

export function CalculatorApp() {
  const { currentPrice, setCurrentPrice, history, clearHistory } = useCalculatorStore();

  return (
    <div className="container mx-auto p-6">
      {/* Header with Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <Calculator className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold">탈출각 계산기</h1>
      </motion.div>

      {/* Input with Hover Effect */}
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="number"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(Number(e.target.value))}
        className="w-full p-3 border rounded-lg"
      />

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2"
      >
        <TrendingUp className="h-5 w-5" />
        Calculate
      </motion.button>

      {/* History with AnimatePresence */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">History</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearHistory}
            className="text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>

        <AnimatePresence>
          {history.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="p-4 mb-2 bg-white rounded-lg shadow"
            >
              {/* History item content */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## Best Practices

### Zustand

- ✅ Use selectors to prevent unnecessary re-renders
- ✅ Split large stores into smaller, focused stores
- ✅ Use `partialize` to only persist necessary data
- ❌ Don't store derived state (use selectors instead)

### Lucide React

- ✅ Import only icons you use (tree-shaking)
- ✅ Use Tailwind classes for consistent styling
- ✅ Define icon sizes in your design system
- ❌ Don't inline SVG when Lucide provides the icon

### Framer Motion

- ✅ Use `transform` and `opacity` for best performance
- ✅ Use `AnimatePresence` for exit animations
- ✅ Use `layout` prop for automatic layout animations
- ❌ Don't animate `width`, `height` (use `scale` instead)
- ❌ Don't forget to add `key` prop for list animations
