"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  calculateTargetAverage,
  formatCurrency,
  formatNumber,
  type TargetAverageResult,
} from "@/lib/calculator";
import { useCalculatorStore } from "@/stores/calculator-store";

export function TargetAverageCalculator() {
  const { currentPrice, currentQuantity, setCurrentPrice, setCurrentQuantity, reset } =
    useCalculatorStore();

  const [currentAveragePrice, setCurrentAveragePrice] = useState(0);
  const [targetAveragePrice, setTargetAveragePrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [result, setResult] = useState<TargetAverageResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = () => {
    try {
      setError("");
      const calculationResult = calculateTargetAverage({
        currentPrice,
        currentQuantity,
        currentAveragePrice,
        targetAveragePrice,
        newPrice,
      });
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "계산 중 오류가 발생했습니다");
      setResult(null);
    }
  };

  const handleReset = () => {
    reset();
    setCurrentAveragePrice(0);
    setTargetAveragePrice(0);
    setNewPrice(0);
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-5" />
            목표 평단가 역산
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentPrice">현재 주가</Label>
              <Input
                id="currentPrice"
                type="number"
                placeholder="0"
                value={currentPrice || ""}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentQuantity">현재 보유 수량</Label>
              <Input
                id="currentQuantity"
                type="number"
                placeholder="0"
                value={currentQuantity || ""}
                onChange={(e) => setCurrentQuantity(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAverage">현재 평단가</Label>
              <Input
                id="currentAverage"
                type="number"
                placeholder="0"
                value={currentAveragePrice || ""}
                onChange={(e) => setCurrentAveragePrice(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAverage">목표 평단가</Label>
              <Input
                id="targetAverage"
                type="number"
                placeholder="0"
                value={targetAveragePrice || ""}
                onChange={(e) => setTargetAveragePrice(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="newPrice">추가 매수 가격</Label>
              <Input
                id="newPrice"
                type="number"
                placeholder="0"
                value={newPrice || ""}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {error}
            </motion.div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              <Target className="mr-2 size-4" />
              계산하기
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="border-primary/20 border-2">
            <CardHeader>
              <CardTitle className="text-lg">계산 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="from-primary/5 to-primary/10 rounded-lg border bg-gradient-to-br p-4"
                >
                  <div className="text-muted-foreground text-sm">필요 수량</div>
                  <div className="text-primary mt-1 text-2xl font-bold">
                    {formatNumber(result.requiredQuantity)}주
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-950 dark:to-blue-900"
                >
                  <div className="text-muted-foreground text-sm">필요 투자금</div>
                  <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.requiredInvestment)}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-muted/50 rounded-lg border p-4"
                >
                  <div className="text-muted-foreground text-sm">총 보유 수량</div>
                  <div className="mt-1 text-xl font-semibold">
                    {formatNumber(result.totalQuantity)}주
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="bg-muted/50 rounded-lg border p-4"
                >
                  <div className="text-muted-foreground text-sm">총 투자금</div>
                  <div className="mt-1 text-xl font-semibold">
                    {formatCurrency(result.totalInvestment)}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
