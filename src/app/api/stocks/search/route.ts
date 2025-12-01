import { NextResponse } from "next/server";
import stocksData from "@/../public/stocks.json";

interface Stock {
  symbol: string;
  name: string;
  market: string;
}

/**
 * Convert Korean character to chosung (initial consonant)
 * 한글 → 초성 변환 (ㄱ, ㄴ, ㄷ, ...)
 */
function getChosung(char: string): string {
  const code = char.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return char; // Not Korean
  return String.fromCharCode(Math.floor(code / 588) + 0x1100);
}

/**
 * Convert Korean string to chosung string
 * "삼성전자" → "ㅅㅅㅈㅈ"
 */
function toChosung(str: string): string {
  return str
    .split("")
    .map((char) => getChosung(char))
    .join("");
}

/**
 * Search stocks by query (name, symbol, or chosung)
 */
function searchStocks(query: string, limit = 10): Stock[] {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  const results: Stock[] = [];

  for (const stock of stocksData as Stock[]) {
    const { symbol, name } = stock;

    // Exact symbol match (highest priority)
    if (symbol === lowerQuery) {
      results.unshift(stock);
      continue;
    }

    // Symbol starts with query
    if (symbol.startsWith(lowerQuery)) {
      results.push(stock);
      continue;
    }

    // Name contains query (Korean)
    if (name.toLowerCase().includes(lowerQuery)) {
      results.push(stock);
      continue;
    }

    // Chosung match (초성 검색)
    const chosung = toChosung(name);
    if (chosung.includes(lowerQuery)) {
      results.push(stock);
      continue;
    }

    // Stop if we have enough results
    if (results.length >= limit * 2) break;
  }

  return results.slice(0, limit);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    // Search in Korean stocks (2,221 stocks)
    const koreanResults = searchStocks(query, 10);

    // Format results
    const results = koreanResults.map((stock) => ({
      symbol: `${stock.symbol}.KS`, // Yahoo Finance format for KRX stocks
      name: stock.name,
      type: "EQUITY",
      exchange: stock.market,
      code: stock.symbol, // Original 6-digit code
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json(
      { error: "Failed to search stocks", details: String(error) },
      { status: 500 }
    );
  }
}
