/**
 * CSV to JSON converter for Korean stock data
 * Converts stock_master.csv to public/stocks.json
 */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const CSV_PATH = path.join(__dirname, "..", "stock_master.csv");
const JSON_PATH = path.join(__dirname, "..", "public", "stocks.json");

function parseCSV(content) {
  const lines = content.split("\n");
  // Skip header line
  const stocks = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line (handles quoted fields)
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const cleanValues = values.map((v) => v.replace(/^"|"$/g, "").trim());

    if (cleanValues.length < 3) continue;

    const [symbol, name, market, listing] = cleanValues;

    // Only include listed stocks
    if (listing === "True") {
      stocks.push({
        symbol,
        name,
        market,
      });
    }
  }

  return stocks;
}

function main() {
  console.log("📊 Converting stock_master.csv to JSON...");

  // Read CSV
  const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
  const stocks = parseCSV(csvContent);

  console.log(`✅ Parsed ${stocks.length} listed stocks`);

  // Ensure public directory exists
  const publicDir = path.dirname(JSON_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(stocks, null, 2), "utf-8");

  console.log(`💾 Saved to ${JSON_PATH}`);
  console.log("\n🎉 Conversion complete!");
}

main();
