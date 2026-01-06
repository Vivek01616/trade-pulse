import { useState, useEffect } from "react";
import { indicesData, IndexData } from "@/data/indices";

export const useLivePrices = () => {
  const [indices, setIndices] = useState<IndexData[]>(indicesData);

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setIndices((currentIndices) =>
        currentIndices.map((index) => {
          // Different volatility for forex vs indices
          const isForex = index.category === "forex";
          const baseVolatility = isForex ? 0.0002 : 0.001;
          const volatility = index.symbol === "VIX" ? 0.005 : baseVolatility;
          
          const priceChange = (Math.random() - 0.5) * 2 * volatility * index.price;
          const decimals = isForex && index.price < 10 ? 5 : 2;
          const newPrice = parseFloat((index.price + priceChange).toFixed(decimals));
          const newChange = parseFloat(
            (index.change + priceChange * 0.1).toFixed(decimals)
          );
          const newChangePercent = parseFloat(
            ((newChange / (newPrice - newChange)) * 100).toFixed(2)
          );

          return {
            ...index,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            high: Math.max(index.high, newPrice),
            low: Math.min(index.low, newPrice),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return indices;
};
