import { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { CandleData } from "@/data/indices";

interface CandlestickChartProps {
  data: CandleData[];
  isForex: boolean;
}

interface CandleBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  open: number;
  close: number;
  high: number;
  low: number;
  yAxisScale: (value: number) => number;
}

const CandleBar = ({
  x,
  y,
  width,
  open,
  close,
  high,
  low,
  yAxisScale,
}: CandleBarProps) => {
  const isUp = close >= open;
  const color = isUp ? "hsl(142, 76%, 45%)" : "hsl(0, 72%, 51%)";
  const bodyTop = yAxisScale(Math.max(open, close));
  const bodyBottom = yAxisScale(Math.min(open, close));
  const bodyHeight = Math.max(Math.abs(bodyBottom - bodyTop), 1);
  const wickTop = yAxisScale(high);
  const wickBottom = yAxisScale(low);

  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={wickTop}
        x2={x + width / 2}
        y2={wickBottom}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x + 2}
        y={bodyTop}
        width={Math.max(width - 4, 2)}
        height={bodyHeight}
        fill={isUp ? color : color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

const CandlestickChart = ({ data, isForex }: CandlestickChartProps) => {
  const processedData = useMemo(() => {
    return data.map((candle) => ({
      ...candle,
      // For bar chart, we need a range value
      range: [candle.low, candle.high],
      bodyRange: [Math.min(candle.open, candle.close), Math.max(candle.open, candle.close)],
    }));
  }, [data]);

  const [minValue, maxValue] = useMemo(() => {
    const lows = data.map((d) => d.low);
    const highs = data.map((d) => d.high);
    const min = Math.min(...lows);
    const max = Math.max(...highs);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, [data]);

  const formatPrice = (value: number) => {
    if (isForex) {
      return value.toFixed(value < 10 ? 5 : 2);
    }
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isUp = data.close >= data.open;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
          <p className="text-muted-foreground text-xs mb-2">{data.date}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Open:</span>
              <span className="font-mono text-foreground">{formatPrice(data.open)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">High:</span>
              <span className="font-mono text-success">{formatPrice(data.high)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-mono text-destructive">{formatPrice(data.low)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Close:</span>
              <span className={`font-mono ${isUp ? "text-success" : "text-destructive"}`}>
                {formatPrice(data.close)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={processedData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(220, 15%, 20%)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
          dy={10}
          interval="preserveStartEnd"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
          tickFormatter={formatPrice}
          domain={[minValue, maxValue]}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {/* Candlesticks using Bar with custom shape */}
        <Bar
          dataKey="range"
          shape={(props: any) => {
            const { x, width, payload } = props;
            const yAxisScale = (value: number) => {
              const chartHeight = 400 - 20; // Approximate chart height minus margins
              const range = maxValue - minValue;
              return 10 + ((maxValue - value) / range) * chartHeight;
            };
            
            return (
              <CandleBar
                x={x}
                y={0}
                width={width}
                height={0}
                open={payload.open}
                close={payload.close}
                high={payload.high}
                low={payload.low}
                yAxisScale={yAxisScale}
              />
            );
          }}
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.close >= entry.open ? "hsl(142, 76%, 45%)" : "hsl(0, 72%, 51%)"}
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
