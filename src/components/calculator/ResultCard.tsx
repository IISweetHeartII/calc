"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AveragingDownResult } from "@/lib/calculator";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/calculator";

interface ResultCardProps {
  result: AveragingDownResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const isProfitable = result.profitLossPercentage >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="border-primary/20 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-primary h-5 w-5" />
            계산 결과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Average Price */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-primary/5 rounded-lg p-4"
            >
              <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4" />
                평균 매수가
              </div>
              <div className="text-2xl font-bold">{formatCurrency(result.averagePrice)}</div>
            </motion.div>

            {/* Total Quantity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/5 rounded-lg p-4"
            >
              <div className="text-muted-foreground mb-1 text-sm">총 수량</div>
              <div className="text-2xl font-bold">{formatNumber(result.totalQuantity)}개</div>
            </motion.div>

            {/* Total Investment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/5 rounded-lg p-4"
            >
              <div className="text-muted-foreground mb-1 text-sm">총 투자금</div>
              <div className="text-2xl font-bold">{formatCurrency(result.totalInvestment)}</div>
            </motion.div>

            {/* Profit/Loss */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`rounded-lg p-4 ${
                isProfitable
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              <div className="mb-1 flex items-center gap-2 text-sm opacity-80">
                {isProfitable ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                현재 손익률
              </div>
              <div className="text-2xl font-bold">
                {formatPercentage(result.profitLossPercentage)}
              </div>
            </motion.div>
          </div>

          {/* Break Even Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-muted/50 mt-4 rounded-lg p-4"
          >
            <div className="text-muted-foreground mb-2 text-sm">💡 손익분기점 (평균 매수가)</div>
            <div className="text-lg font-semibold">
              {formatCurrency(result.breakEvenPrice)} 이상에서 수익 발생
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
