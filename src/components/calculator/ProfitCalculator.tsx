"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage } from "@/lib/calculator";
import { AssetSearch } from "./AssetSearch";

export function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const calculateProfit = () => {
    const buy = parseFloat(buyPrice.replace(/,/g, "")) || 0;
    const sell = parseFloat(sellPrice.replace(/,/g, "")) || 0;
    const qty = parseFloat(quantity.replace(/,/g, "")) || 0;

    const totalBuy = buy * qty;
    const totalSell = sell * qty;
    const profit = totalSell - totalBuy;
    const profitRate = totalBuy > 0 ? (profit / totalBuy) * 100 : 0;

    return { totalBuy, totalSell, profit, profitRate };
  };

  const result = calculateProfit();
  const isProfitable = result.profit >= 0;

  const handleReset = () => {
    setBuyPrice("");
    setSellPrice("");
    setQuantity("");
  };

  const handleCoinSelect = (price: number) => {
    setBuyPrice(price.toString());
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="text-primary h-5 w-5" />
              수익률 계산
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>자산 검색 (선택)</Label>
              <AssetSearch onSelect={handleCoinSelect} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyPrice">매수 가격</Label>
              <div className="relative">
                <DollarSign className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  id="buyPrice"
                  placeholder="0"
                  className="pl-9"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellPrice">매도 가격</Label>
              <div className="relative">
                <DollarSign className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  id="sellPrice"
                  placeholder="0"
                  className="pl-9"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">수량</Label>
              <Input
                id="quantity"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
              />
            </div>

            <Button variant="outline" className="w-full" onClick={handleReset}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              초기화
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-primary/20 h-full border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary h-5 w-5" />
              계산 결과
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-muted-foreground mb-1 text-sm">총 매수금액</div>
                <div className="text-xl font-bold">{formatCurrency(result.totalBuy)}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-muted-foreground mb-1 text-sm">총 평가금액</div>
                <div className="text-xl font-bold">{formatCurrency(result.totalSell)}</div>
              </div>
            </div>

            <div
              className={`rounded-lg p-6 text-center ${
                isProfitable
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              <div className="mb-2 flex items-center justify-center gap-2 text-lg font-medium opacity-90">
                {isProfitable ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
                예상 손익
              </div>
              <div className="text-4xl font-bold">{formatCurrency(result.profit)}</div>
              <div className="mt-2 text-xl font-semibold">
                {result.profitRate > 0 ? "+" : ""}
                {formatPercentage(result.profitRate)}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
