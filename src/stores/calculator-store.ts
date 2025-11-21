import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Calculator calculation history item
 */
export interface CalculationHistory {
  id: string;
  timestamp: number;
  type: "averaging-down" | "target-average";
  currentPrice: number;
  currentQuantity: number;
  additionalPrice: number;
  additionalQuantity: number;
  result: {
    averagePrice: number;
    totalQuantity: number;
    totalInvestment: number;
  };
}

/**
 * Calculator store state
 */
interface CalculatorState {
  // Current input values
  currentPrice: number;
  currentQuantity: number;
  additionalPrice: number;
  additionalQuantity: number;

  // Calculation history
  history: CalculationHistory[];

  // Actions
  setCurrentPrice: (price: number) => void;
  setCurrentQuantity: (quantity: number) => void;
  setAdditionalPrice: (price: number) => void;
  setAdditionalQuantity: (quantity: number) => void;
  addToHistory: (item: CalculationHistory) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
  reset: () => void;
}

/**
 * Calculator store with persistence
 */
export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      // Initial state
      currentPrice: 0,
      currentQuantity: 0,
      additionalPrice: 0,
      additionalQuantity: 0,
      history: [],

      // Actions
      setCurrentPrice: (price) => set({ currentPrice: price }),
      setCurrentQuantity: (quantity) => set({ currentQuantity: quantity }),
      setAdditionalPrice: (price) => set({ additionalPrice: price }),
      setAdditionalQuantity: (quantity) => set({ additionalQuantity: quantity }),

      addToHistory: (item) =>
        set((state) => ({
          history: [item, ...state.history].slice(0, 10), // Keep last 10 items
        })),

      clearHistory: () => set({ history: [] }),

      removeHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),

      reset: () =>
        set({
          currentPrice: 0,
          currentQuantity: 0,
          additionalPrice: 0,
          additionalQuantity: 0,
        }),
    }),
    {
      name: "calculator-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist history, not current input values
      partialize: (state) => ({ history: state.history }),
    }
  )
);
