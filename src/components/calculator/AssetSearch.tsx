"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Coins, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SEARCH_RESULTS_LIMIT } from "@/constants";

interface Market {
  market: string;
  korean_name: string;
  english_name: string;
}

interface Stock {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
}

interface AssetSearchProps {
  onSelect: (price: number, name: string) => void;
  className?: string;
}

type Category = "crypto" | "stock";

export function AssetSearch({ onSelect, className }: AssetSearchProps) {
  const [category, setCategory] = useState<Category>("crypto");
  const [query, setQuery] = useState("");

  // Crypto State
  const [cryptoMarkets, setCryptoMarkets] = useState<Market[]>([]);

  // Shared State
  const [filteredResults, setFilteredResults] = useState<(Market | Stock)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load crypto markets on mount
  useEffect(() => {
    const fetchCryptoMarkets = async () => {
      try {
        const res = await fetch("/api/upbit/markets");
        if (res.ok) {
          const data = await res.json();
          setCryptoMarkets(data);
        }
      } catch (error) {
        console.error("Failed to load crypto markets", error);
      }
    };
    fetchCryptoMarkets();
  }, []);

  // Handle Search
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    const search = async () => {
      if (category === "crypto") {
        const lowerQuery = query.toLowerCase();
        const filtered = cryptoMarkets
          .filter(
            (m) =>
              m.korean_name.includes(query) ||
              m.english_name.toLowerCase().includes(lowerQuery) ||
              m.market.toLowerCase().includes(lowerQuery)
          )
          .slice(0, SEARCH_RESULTS_LIMIT);
        setFilteredResults(filtered);
        setIsOpen(true);
      } else {
        // Stock Search
        setIsLoading(true);
        try {
          const res = await fetch(`/api/stocks/search?query=${encodeURIComponent(query)}`);
          if (res.ok) {
            const data = await res.json();
            setFilteredResults(data.slice(0, 10));
            setIsOpen(true);
          }
        } catch (error) {
          console.error("Stock search failed", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Debounce for stock search
    const timeoutId = setTimeout(
      () => {
        search();
      },
      category === "stock" ? 500 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [query, category, cryptoMarkets]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (item: Market | Stock) => {
    setIsOpen(false);
    setIsFetchingPrice(true);

    try {
      if (category === "crypto") {
        const market = item as Market;
        setQuery(market.korean_name);
        const res = await fetch(`/api/upbit/ticker?market=${market.market}`);
        if (res.ok) {
          const data = await res.json();
          onSelect(data.trade_price, market.korean_name);
        }
      } else {
        const stock = item as Stock;
        setQuery(stock.name);
        const res = await fetch(`/api/stocks/price?symbol=${stock.symbol}`);
        if (res.ok) {
          const data = await res.json();
          onSelect(data.price, stock.name);
        }
      }
    } catch (error) {
      console.error("Failed to fetch price", error);
    } finally {
      setIsFetchingPrice(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative space-y-2", className)}>
      <div className="bg-muted/50 grid w-full grid-cols-2 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCategory("crypto");
            setQuery("");
            setFilteredResults([]);
          }}
          className={cn(
            "gap-2 transition-all duration-200",
            category === "crypto"
              ? "bg-background text-primary hover:bg-background shadow-sm"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Coins className="h-4 w-4" />
          코인
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCategory("stock");
            setQuery("");
            setFilteredResults([]);
          }}
          className={cn(
            "gap-2 transition-all duration-200",
            category === "stock"
              ? "bg-background text-primary hover:bg-background shadow-sm"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <TrendingUp className="h-4 w-4" />
          주식
        </Button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
        <Input
          placeholder={
            category === "crypto" ? "코인 검색 (예: 비트코인)" : "주식 검색 (예: 삼성전자, 005930)"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9"
        />
        {(isLoading || isFetchingPrice) && (
          <Loader2 className="text-primary absolute top-2.5 right-3 h-4 w-4 animate-spin" />
        )}
      </div>

      {isOpen && filteredResults.length > 0 && (
        <div className="bg-popover text-popover-foreground absolute z-50 mt-1 w-full overflow-hidden rounded-md border shadow-md">
          <ul className="max-h-60 overflow-auto py-1">
            {filteredResults.map((item) => {
              const isCrypto = category === "crypto";
              const title = isCrypto ? (item as Market).korean_name : (item as Stock).name;
              const subtitle = isCrypto
                ? `${(item as Market).english_name} (${(item as Market).market})`
                : `${(item as Stock).symbol} • ${(item as Stock).exchange}`;

              return (
                <li key={isCrypto ? (item as Market).market : (item as Stock).symbol}>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start rounded-none px-4 py-2 text-left font-normal"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex w-full flex-col items-start gap-0.5 overflow-hidden">
                      <span className="w-full truncate font-medium">{title}</span>
                      <span className="text-muted-foreground w-full truncate text-xs">
                        {subtitle}
                      </span>
                    </div>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
