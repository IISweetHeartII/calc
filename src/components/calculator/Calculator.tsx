"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalculatorIcon, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAveragingDown, type AveragingDownResult } from "@/lib/calculator";
import { useCalculatorStore } from "@/stores/calculator-store";
import { ResultCard } from "./ResultCard";

export function Calculator() {
  const {
    currentPrice,
    currentQuantity,
    additionalPrice,
    additionalQuantity,
    setCurrentPrice,
    setCurrentQuantity,
    setAdditionalPrice,
    setAdditionalQuantity,
    reset,
    addToHistory,
  } = useCalculatorStore();

  const [result, setResult] = useState<AveragingDownResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = () => {
    try {
      setError("");
      const calculationResult = calculateAveragingDown({
        currentPrice,
        currentQuantity,
        additionalPrice,
        additionalQuantity,
      });

      setResult(calculationResult);

      // Add to history
      addToHistory({
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: "averaging-down",
        currentPrice,
        currentQuantity,
        additionalPrice,
        additionalQuantity,
        result: calculationResult,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "계산 중 오류가 발생했습니다");
      setResult(null);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <CalculatorIcon className="text-primary h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">탈출각 계산기</h1>
          <p className="text-muted-foreground">물타기 계산으로 평단가를 확인하세요</p>
        </div>
      </motion.div>

      {/* Calculator Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>물타기 계산</CardTitle>
            <CardDescription>현재 보유 수량과 추가 매수 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Holdings */}
            <div className="space-y-4">
              <h3 className="text-muted-foreground text-sm font-semibold">현재 보유</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">평균 매수가</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    placeholder="10000"
                    value={currentPrice || ""}
                    onChange={(e) => setCurrentPrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentQuantity">보유 수량</Label>
                  <Input
                    id="currentQuantity"
                    type="number"
                    placeholder="100"
                    value={currentQuantity || ""}
                    onChange={(e) => setCurrentQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Additional Purchase */}
            <div className="space-y-4">
              <h3 className="text-muted-foreground text-sm font-semibold">추가 매수</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additionalPrice">매수 가격</Label>
                  <Input
                    id="additionalPrice"
                    type="number"
                    placeholder="8000"
                    value={additionalPrice || ""}
                    onChange={(e) => setAdditionalPrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalQuantity">매수 수량</Label>
                  <Input
                    id="additionalQuantity"
                    type="number"
                    placeholder="50"
                    value={additionalQuantity || ""}
                    onChange={(e) => setAdditionalQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive bg-destructive/10 rounded-lg p-3 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button onClick={handleCalculate} className="w-full" size="lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  계산하기
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  초기화
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Result */}
      {result && <ResultCard result={result} />}
    </div>
  );
}
