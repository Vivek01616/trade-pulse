import { useState, useEffect } from "react";
import { indicesData, IndexData } from "@/data/indices";

export const useLivePrices = () => {
  const [indices, setIndices] = useState<IndexData[]>(indicesData);

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setIndices((currentIndices) =>
        currentIndices.map((index) => {
          const volatility = index.symbol === "VIX" ? 0.005 : 0.001;
          const priceChange = (Math.random() - 0.5) * 2 * volatility * index.price;
          const newPrice = parseFloat((index.price + priceChange).toFixed(2));
          const newChange = parseFloat(
            (index.change + priceChange * 0.1).toFixed(2)
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
