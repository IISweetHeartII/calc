import { useRef } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Target, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AveragingDownResult } from "@/lib/calculator";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/calculator";

interface ResultCardProps {
  result: AveragingDownResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const isProfitable = result.profitLossPercentage >= 0;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        // Try native sharing first (mobile)
        if (navigator.share) {
          try {
            const file = new File([blob], "clac-result.png", { type: "image/png" });
            await navigator.share({
              title: "탈출각 계산 결과",
              text: "내 물타기 계산 결과입니다.",
              files: [file],
            });
            return;
          } catch (err) {
            console.error("Sharing failed, falling back to download", err);
          }
        }

        // Fallback to download
        const link = document.createElement("a");
        link.download = "clac-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    } catch (err) {
      console.error("Failed to capture image:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
    >
      <div ref={cardRef}>
        <Card className="border-primary/20 border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary h-5 w-5" />
              계산 결과
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-muted-foreground hover:text-primary"
              title="이미지로 저장/공유"
            >
              <Share2 className="h-4 w-4" />
            </Button>
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
      </div>
    </motion.div>
  );
}
