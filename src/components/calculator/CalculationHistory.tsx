"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCalculatorStore } from "@/stores/calculator-store";
import { formatCurrency, formatNumber } from "@/lib/calculator";

export function CalculationHistory() {
  const { history, clearHistory, removeHistoryItem } = useCalculatorStore();

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="size-5" />
            계산 히스토리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <History className="text-muted-foreground/50 mb-4 size-12" />
            <p className="text-muted-foreground text-sm">
              아직 계산 기록이 없습니다.
              <br />
              계산을 시작해보세요!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="size-5" />
            계산 히스토리
            <span className="text-muted-foreground text-sm font-normal">({history.length}/10)</span>
          </CardTitle>
          <Button onClick={clearHistory} variant="outline" size="sm">
            <Trash2 className="mr-2 size-3" />
            전체 삭제
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {history.map((item, index) => {
              const isProfitable = item.currentPrice >= item.result.averagePrice;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="group bg-card hover:border-primary/50 relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {isProfitable ? (
                          <TrendingUp className="size-4 text-green-600" />
                        ) : (
                          <TrendingDown className="size-4 text-red-600" />
                        )}
                        <span className="text-muted-foreground text-xs">
                          {new Date(item.timestamp).toLocaleString("ko-KR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                          {item.type === "averaging-down" ? "물타기" : "목표 평단가"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div className="text-muted-foreground">
                          현재: {formatCurrency(item.currentPrice)} ×{" "}
                          {formatNumber(item.currentQuantity)}주
                        </div>
                        <div className="text-muted-foreground">
                          추가: {formatCurrency(item.additionalPrice)} ×{" "}
                          {formatNumber(item.additionalQuantity)}주
                        </div>
                      </div>

                      <div className="flex items-center gap-4 border-t pt-2">
                        <div>
                          <div className="text-muted-foreground text-xs">평단가</div>
                          <div className="text-primary font-semibold">
                            {formatCurrency(item.result.averagePrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">총 수량</div>
                          <div className="font-semibold">
                            {formatNumber(item.result.totalQuantity)}주
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">총 투자</div>
                          <div className="font-semibold">
                            {formatCurrency(item.result.totalInvestment)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => removeHistoryItem(item.id)}
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
