"use client";

import { Calculator } from "@/components/calculator/Calculator";
import { TargetAverageCalculator } from "@/components/calculator/TargetAverageCalculator";
import { ProfitCalculator } from "@/components/calculator/ProfitCalculator";
import { CalculationHistory } from "@/components/calculator/CalculationHistory";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, Target, History, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">탈출각</h1>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
              Beta
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">투자 계산기</h2>
          <p className="text-muted-foreground mt-2">
            물타기 계산과 목표 평단가 역산으로 투자 전략을 세워보세요
          </p>
        </div>

        <Tabs defaultValue="averaging-down" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="averaging-down" className="gap-2">
              <TrendingDown className="size-4" />
              <span className="hidden sm:inline">물타기 계산</span>
              <span className="sm:hidden">물타기</span>
            </TabsTrigger>
            <TabsTrigger value="target-average" className="gap-2">
              <Target className="size-4" />
              <span className="hidden sm:inline">목표 평단가</span>
              <span className="sm:hidden">평단가</span>
            </TabsTrigger>
            <TabsTrigger value="profit" className="gap-2">
              <TrendingUp className="size-4" />
              <span className="hidden sm:inline">수익률 계산</span>
              <span className="sm:hidden">수익률</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="size-4" />
              <span className="hidden sm:inline">히스토리</span>
              <span className="sm:hidden">기록</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="averaging-down" className="space-y-6">
            <Calculator />
          </TabsContent>

          <TabsContent value="target-average" className="space-y-6">
            <TargetAverageCalculator />
          </TabsContent>

          <TabsContent value="profit" className="space-y-6">
            <ProfitCalculator />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <CalculationHistory />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="text-muted-foreground mt-16 border-t py-8 text-center text-sm">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/IISweetHeartII/calc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground font-medium transition-colors"
          >
            DeokHwan
          </a>
        </p>
        <p className="mt-2">
          투자 손실에 대한 책임은 투자자 본인에게 있습니다. 이 도구는 참고용입니다.
        </p>
      </footer>
    </div>
  );
}
