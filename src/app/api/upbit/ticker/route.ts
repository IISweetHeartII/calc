import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market = searchParams.get("market");

  if (!market) {
    return NextResponse.json({ error: "Market parameter is required" }, { status: 400 });
  }

  // Validate market format (KRW-XXX format, uppercase letters, 7-15 chars)
  if (!/^KRW-[A-Z]{3,10}$/.test(market)) {
    return NextResponse.json({ error: "Invalid market format" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.upbit.com/v1/ticker?markets=${market}`);

    if (!response.ok) {
      throw new Error("Failed to fetch ticker");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Ticker not found" }, { status: 404 });
    }

    return NextResponse.json({
      trade_price: data[0].trade_price,
    });
  } catch (error) {
    console.error("Upbit API Error:", error);
    return NextResponse.json({ error: "Failed to fetch ticker" }, { status: 500 });
  }
}
