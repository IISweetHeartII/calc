/**
 * Calculator utility functions for investment calculations
 */

export interface AveragingDownInput {
  currentPrice: number;
  currentQuantity: number;
  additionalPrice: number;
  additionalQuantity: number;
}

export interface AveragingDownResult {
  averagePrice: number;
  totalQuantity: number;
  totalInvestment: number;
  profitLossPercentage: number;
  breakEvenPrice: number;
}

export interface TargetAverageInput {
  currentPrice: number;
  currentQuantity: number;
  currentAveragePrice: number;
  targetAveragePrice: number;
  newPrice: number;
}

export interface TargetAverageResult {
  requiredQuantity: number;
  requiredInvestment: number;
  totalQuantity: number;
  totalInvestment: number;
}

/**
 * Calculate average price after averaging down (물타기 계산)
 */
export function calculateAveragingDown(input: AveragingDownInput): AveragingDownResult {
  const { currentPrice, currentQuantity, additionalPrice, additionalQuantity } = input;

  // Validation
  if (currentQuantity <= 0 || additionalQuantity <= 0) {
    throw new Error("수량은 0보다 커야 합니다");
  }

  if (currentPrice <= 0 || additionalPrice <= 0) {
    throw new Error("가격은 0보다 커야 합니다");
  }

  // Calculate current investment
  const currentInvestment = currentPrice * currentQuantity;
  const additionalInvestment = additionalPrice * additionalQuantity;
  const totalInvestment = currentInvestment + additionalInvestment;

  // Calculate totals
  const totalQuantity = currentQuantity + additionalQuantity;
  const averagePrice = totalInvestment / totalQuantity;

  // Calculate profit/loss percentage based on current average
  const profitLossPercentage = ((additionalPrice - averagePrice) / averagePrice) * 100;

  return {
    averagePrice: Number(averagePrice.toFixed(2)),
    totalQuantity,
    totalInvestment: Number(totalInvestment.toFixed(2)),
    profitLossPercentage: Number(profitLossPercentage.toFixed(2)),
    breakEvenPrice: Number(averagePrice.toFixed(2)),
  };
}

/**
 * Calculate required quantity to reach target average price (목표 평단가 역산)
 */
export function calculateTargetAverage(input: TargetAverageInput): TargetAverageResult {
  const { currentPrice, currentQuantity, currentAveragePrice, targetAveragePrice, newPrice } =
    input;

  // Validation
  if (currentQuantity <= 0) {
    throw new Error("현재 수량은 0보다 커야 합니다");
  }

  if (currentPrice <= 0 || newPrice <= 0) {
    throw new Error("가격은 0보다 커야 합니다");
  }

  if (currentAveragePrice <= 0 || targetAveragePrice <= 0) {
    throw new Error("평균 가격은 0보다 커야 합니다");
  }

  if (targetAveragePrice >= currentAveragePrice) {
    throw new Error("목표 평단가는 현재 평단가보다 낮아야 합니다");
  }

  // Current total investment
  const currentInvestment = currentAveragePrice * currentQuantity;

  // Formula: targetAverage = (currentInvestment + newPrice * x) / (currentQuantity + x)
  // Solve for x (required quantity)
  // x = (currentInvestment - targetAverage * currentQuantity) / (targetAverage - newPrice)
  const requiredQuantity =
    (currentInvestment - targetAveragePrice * currentQuantity) / (targetAveragePrice - newPrice);

  if (requiredQuantity <= 0) {
    throw new Error("목표 평단가에 도달할 수 없습니다. 매수 가격을 확인해주세요");
  }

  const requiredInvestment = newPrice * requiredQuantity;
  const totalQuantity = currentQuantity + requiredQuantity;
  const totalInvestment = currentInvestment + requiredInvestment;

  return {
    requiredQuantity: Number(requiredQuantity.toFixed(4)),
    requiredInvestment: Number(requiredInvestment.toFixed(2)),
    totalQuantity: Number(totalQuantity.toFixed(4)),
    totalInvestment: Number(totalInvestment.toFixed(2)),
  };
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}

/**
 * Format currency (KRW)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
