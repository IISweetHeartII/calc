import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 });
  }

  // Validate symbol format (alphanumeric, dots, hyphens only, 1-15 chars)
  if (!/^[A-Za-z0-9.-]{1,15}$/.test(symbol)) {
    return NextResponse.json({ error: "Invalid symbol format" }, { status: 400 });
  }

  try {
    // Use Yahoo Finance public quote API directly (v8)
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Yahoo API responded with ${response.status}`);
    }

    const data = await response.json();
    const result = data.chart.result[0];

    if (!result || !result.meta) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({
      price: result.meta.regularMarketPrice,
      currency: result.meta.currency,
    });
  } catch (error) {
    console.error("Yahoo Finance Price Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch price", details: String(error) },
      { status: 500 }
    );
  }
}
