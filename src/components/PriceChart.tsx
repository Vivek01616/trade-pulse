import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { IndexData, generateCandlestickData, timeframes } from "@/data/indices";
import CandlestickChart from "./CandlestickChart";

interface PriceChartProps {
  selectedIndex: IndexData;
}

const PriceChart = ({ selectedIndex }: PriceChartProps) => {
  const [activeTimeframe, setActiveTimeframe] = useState("15m");

  const chartData = useMemo(() => {
    const tf = timeframes.find((t) => t.label === activeTimeframe);
    const volatility = selectedIndex.category === "forex" ? 0.001 : 0.008;
    return generateCandlestickData(tf?.periods || 60, selectedIndex.price, volatility);
  }, [activeTimeframe, selectedIndex.id, selectedIndex.price]);

  const isPositive = selectedIndex.change >= 0;
  const isForex = selectedIndex.category === "forex";

  const formatPrice = (price: number) => {
    if (isForex && price < 10) {
      return price.toFixed(5);
    }
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedIndex.symbol}
            </h2>
            <span className="text-muted-foreground">{selectedIndex.name}</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary capitalize">
              {selectedIndex.category}
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="font-mono text-3xl font-bold text-foreground">
              {formatPrice(selectedIndex.price)}
            </span>
            <span
              className={`font-mono text-lg font-medium ${
                isPositive ? "text-success" : "text-destructive"
              }`}
            >
              {isPositive ? "+" : ""}
              {isForex && selectedIndex.price < 10
                ? selectedIndex.change.toFixed(5)
                : selectedIndex.change.toFixed(2)}{" "}
              ({isPositive ? "+" : ""}
              {selectedIndex.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 flex-wrap">
          {timeframes.map((tf) => (
            <Button
              key={tf.label}
              variant={activeTimeframe === tf.label ? "timeframe-active" : "timeframe"}
              size="xs"
              onClick={() => setActiveTimeframe(tf.label)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <CandlestickChart data={chartData} isForex={isForex} />
      </div>
    </div>
  );
};

export default PriceChart;
