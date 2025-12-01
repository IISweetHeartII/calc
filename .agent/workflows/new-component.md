---
description: Scaffold a new React component
---

Create a new component in `src/components`.

1. Ask the user for the component name.
2. Create the component file `src/components/[ComponentName].tsx` with the following template:

```tsx
import { cn } from "@/lib/utils";

interface [ComponentName]Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add props here
}

export function [ComponentName]({ className, ...props }: [ComponentName]Props) {
  return (
    <div className={cn("", className)} {...props}>
      [ComponentName]
    </div>
  );
}
```
