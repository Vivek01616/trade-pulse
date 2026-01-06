export interface IndexData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  category: "index" | "forex";
}

export const indicesData: IndexData[] = [
  // Indices
  {
    id: "spx",
    symbol: "SPX",
    name: "S&P 500",
    price: 5987.42,
    change: 45.23,
    changePercent: 0.76,
    high: 5998.12,
    low: 5942.18,
    volume: "2.4B",
    marketCap: "45.2T",
    category: "index",
  },
  {
    id: "ndx",
    symbol: "NDX",
    name: "NASDAQ 100",
    price: 21234.56,
    change: 187.34,
    changePercent: 0.89,
    high: 21298.45,
    low: 21047.23,
    volume: "1.8B",
    marketCap: "28.1T",
    category: "index",
  },
  {
    id: "dji",
    symbol: "DJI",
    name: "Dow Jones",
    price: 43287.91,
    change: -123.45,
    changePercent: -0.28,
    high: 43456.78,
    low: 43198.23,
    volume: "892M",
    marketCap: "12.8T",
    category: "index",
  },
  {
    id: "rut",
    symbol: "RUT",
    name: "Russell 2000",
    price: 2312.78,
    change: 18.92,
    changePercent: 0.82,
    high: 2318.45,
    low: 2293.67,
    volume: "456M",
    marketCap: "3.2T",
    category: "index",
  },
  {
    id: "vix",
    symbol: "VIX",
    name: "Volatility Index",
    price: 14.23,
    change: -0.87,
    changePercent: -5.76,
    high: 15.12,
    low: 14.08,
    volume: "89M",
    marketCap: "-",
    category: "index",
  },
  {
    id: "ftse",
    symbol: "FTSE",
    name: "FTSE 100",
    price: 8234.56,
    change: 34.12,
    changePercent: 0.42,
    high: 8256.78,
    low: 8198.34,
    volume: "678M",
    marketCap: "2.1T",
    category: "index",
  },
  {
    id: "dax",
    symbol: "DAX",
    name: "DAX 40",
    price: 20456.78,
    change: 156.23,
    changePercent: 0.77,
    high: 20512.34,
    low: 20298.56,
    volume: "234M",
    marketCap: "1.8T",
    category: "index",
  },
  {
    id: "nikkei",
    symbol: "N225",
    name: "Nikkei 225",
    price: 39876.54,
    change: -234.56,
    changePercent: -0.58,
    high: 40123.45,
    low: 39756.78,
    volume: "567M",
    marketCap: "5.4T",
    category: "index",
  },
  // Forex Pairs
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    price: 1.0892,
    change: 0.0023,
    changePercent: 0.21,
    high: 1.0915,
    low: 1.0865,
    volume: "1.2T",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "gbpusd",
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    price: 1.2734,
    change: -0.0018,
    changePercent: -0.14,
    high: 1.2768,
    low: 1.2701,
    volume: "890B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "usdjpy",
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    price: 149.56,
    change: 0.87,
    changePercent: 0.58,
    high: 149.98,
    low: 148.67,
    volume: "1.5T",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "usdchf",
    symbol: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    price: 0.8845,
    change: -0.0012,
    changePercent: -0.14,
    high: 0.8872,
    low: 0.8823,
    volume: "320B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "audusd",
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    price: 0.6543,
    change: 0.0034,
    changePercent: 0.52,
    high: 0.6567,
    low: 0.6498,
    volume: "450B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "usdcad",
    symbol: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    price: 1.3567,
    change: -0.0045,
    changePercent: -0.33,
    high: 1.3612,
    low: 1.3534,
    volume: "380B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "nzdusd",
    symbol: "NZD/USD",
    name: "New Zealand Dollar / US Dollar",
    price: 0.6123,
    change: 0.0021,
    changePercent: 0.34,
    high: 0.6145,
    low: 0.6089,
    volume: "120B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "eurgbp",
    symbol: "EUR/GBP",
    name: "Euro / British Pound",
    price: 0.8552,
    change: 0.0015,
    changePercent: 0.18,
    high: 0.8578,
    low: 0.8532,
    volume: "280B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "eurjpy",
    symbol: "EUR/JPY",
    name: "Euro / Japanese Yen",
    price: 162.89,
    change: 1.23,
    changePercent: 0.76,
    high: 163.45,
    low: 161.56,
    volume: "340B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "gbpjpy",
    symbol: "GBP/JPY",
    name: "British Pound / Japanese Yen",
    price: 190.45,
    change: -0.89,
    changePercent: -0.47,
    high: 191.67,
    low: 189.78,
    volume: "210B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "xauusd",
    symbol: "XAU/USD",
    name: "Gold / US Dollar",
    price: 2045.67,
    change: 12.34,
    changePercent: 0.61,
    high: 2058.90,
    low: 2032.45,
    volume: "180B",
    marketCap: "-",
    category: "forex",
  },
  {
    id: "xagusd",
    symbol: "XAG/USD",
    name: "Silver / US Dollar",
    price: 23.45,
    change: -0.23,
    changePercent: -0.97,
    high: 23.89,
    low: 23.12,
    volume: "45B",
    marketCap: "-",
    category: "forex",
  },
];

export interface CandleData {
  date: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const generateCandlestickData = (
  periods: number,
  basePrice: number,
  volatility: number = 0.02
): CandleData[] => {
  const data: CandleData[] = [];
  let price = basePrice * (1 - volatility * periods / 10);
  const now = new Date();

  for (let i = periods; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(date.getMinutes() - i);

    const open = price;
    const change1 = (Math.random() - 0.5) * volatility * price;
    const change2 = (Math.random() - 0.5) * volatility * price;
    const change3 = (Math.random() - 0.5) * volatility * price;

    const close = open + change1;
    const high = Math.max(open, close) + Math.abs(change2) * 0.5;
    const low = Math.min(open, close) - Math.abs(change3) * 0.5;

    price = close;

    data.push({
      date: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: date.getTime(),
      open: parseFloat(open.toFixed(basePrice < 10 ? 5 : 2)),
      high: parseFloat(high.toFixed(basePrice < 10 ? 5 : 2)),
      low: parseFloat(low.toFixed(basePrice < 10 ? 5 : 2)),
      close: parseFloat(close.toFixed(basePrice < 10 ? 5 : 2)),
      volume: Math.floor(Math.random() * 1000000000),
    });
  }

  return data;
};

export const timeframes = [
  { label: "1m", periods: 60, interval: "minute" },
  { label: "5m", periods: 60, interval: "5min" },
  { label: "15m", periods: 60, interval: "15min" },
  { label: "1H", periods: 60, interval: "hour" },
  { label: "4H", periods: 60, interval: "4hour" },
  { label: "1D", periods: 30, interval: "day" },
  { label: "1W", periods: 52, interval: "week" },
  { label: "1M", periods: 12, interval: "month" },
];
