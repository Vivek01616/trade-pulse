import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "./ui/button";
import { IndexData, generateChartData, timeframes } from "@/data/indices";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  selectedIndex: IndexData;
}

const PriceChart = ({ selectedIndex }: PriceChartProps) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  const chartData = useMemo(() => {
    const tf = timeframes.find((t) => t.label === activeTimeframe);
    return generateChartData(tf?.days || 30, selectedIndex.price, 0.015);
  }, [activeTimeframe, selectedIndex.id]);

  const isPositive = selectedIndex.change >= 0;
  const gradientId = `gradient-${selectedIndex.id}`;
  const strokeColor = isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 72%, 51%)";
  const gradientColor = isPositive ? "34, 197, 94" : "239, 68, 68";

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedIndex.symbol}
            </h2>
            <span className="text-muted-foreground">{selectedIndex.name}</span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="font-mono text-3xl font-bold text-foreground">
              {selectedIndex.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span
              className={cn(
                "font-mono text-lg font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? "+" : ""}
              {selectedIndex.change.toFixed(2)} ({isPositive ? "+" : ""}
              {selectedIndex.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50">
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
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={`rgb(${gradientColor})`}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={`rgb(${gradientColor})`}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220, 15%, 20%)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
              domain={["dataMin - 50", "dataMax + 50"]}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 20%, 10%)",
                border: "1px solid hsl(220, 15%, 22%)",
                borderRadius: "8px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(215, 15%, 55%)" }}
              itemStyle={{ color: "hsl(210, 20%, 95%)" }}
              formatter={(value: number) => [
                value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
                "Price",
              ]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
