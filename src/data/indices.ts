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
}

export const indicesData: IndexData[] = [
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
  },
];

export const generateChartData = (days: number, basePrice: number, volatility: number = 0.02) => {
  const data = [];
  let price = basePrice * (1 - volatility * days / 2);
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.48) * volatility * price;
    price = Math.max(price + change, price * 0.9);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timestamp: date.getTime(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000000),
    });
  }
  
  return data;
};

export const timeframes = [
  { label: "1D", days: 1 },
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
  { label: "5Y", days: 1825 },
];
