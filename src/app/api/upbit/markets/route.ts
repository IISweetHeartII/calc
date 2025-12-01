import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.upbit.com/v1/market/all?isDetails=false");

    if (!response.ok) {
      throw new Error("Failed to fetch markets");
    }

    const data = await response.json();

    // Filter for KRW markets only
    const krwMarkets = data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((market: any) => market.market.startsWith("KRW-"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((market: any) => ({
        market: market.market,
        korean_name: market.korean_name,
        english_name: market.english_name,
      }));

    return NextResponse.json(krwMarkets, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Upbit API Error:", error);
    return NextResponse.json({ error: "Failed to fetch markets" }, { status: 500 });
  }
}
