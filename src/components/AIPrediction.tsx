import { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Zap,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { IndexData } from "@/data/indices";
import { cn } from "@/lib/utils";

interface AIPredictionProps {
  selectedIndex: IndexData;
}

interface PredictionResult {
  direction: "bullish" | "bearish";
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  support: number;
  resistance: number;
  riskReward: number;
  analysis: string;
}

const AIPrediction = ({ selectedIndex }: AIPredictionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const isForex = selectedIndex.category === "forex";
  const decimals = isForex && selectedIndex.price < 10 ? 5 : 2;

  const formatPrice = (price: number) => {
    if (isForex && selectedIndex.price < 10) {
      return price.toFixed(5);
    }
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const generatePrediction = () => {
    setIsLoading(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      const isBullish = Math.random() > 0.45;
      const volatilityFactor = isForex ? 0.003 : 0.015;
      const price = selectedIndex.price;

      const entryOffset = (Math.random() * 0.002 + 0.001) * price;
      const entry = isBullish ? price + entryOffset : price - entryOffset;

      const slDistance = (Math.random() * 0.01 + 0.005) * price;
      const stopLoss = isBullish ? entry - slDistance : entry + slDistance;

      const tp1Distance = slDistance * (1.5 + Math.random());
      const tp2Distance = slDistance * (2.5 + Math.random());
      const tp3Distance = slDistance * (4 + Math.random());

      const takeProfit1 = isBullish ? entry + tp1Distance : entry - tp1Distance;
      const takeProfit2 = isBullish ? entry + tp2Distance : entry - tp2Distance;
      const takeProfit3 = isBullish ? entry + tp3Distance : entry - tp3Distance;

      const supportOffset = (Math.random() * 0.02 + 0.01) * price;
      const resistanceOffset = (Math.random() * 0.02 + 0.01) * price;

      const support = Math.min(selectedIndex.low, price - supportOffset);
      const resistance = Math.max(selectedIndex.high, price + resistanceOffset);

      const riskReward = tp2Distance / slDistance;

      const analyses = [
        `Strong ${isBullish ? "bullish" : "bearish"} momentum detected with ${isBullish ? "higher highs" : "lower lows"} forming. Key ${isBullish ? "support" : "resistance"} holding well.`,
        `Price action shows ${isBullish ? "accumulation" : "distribution"} pattern. Volume confirms ${isBullish ? "buying" : "selling"} pressure.`,
        `Technical indicators align for ${isBullish ? "long" : "short"} entry. RSI and MACD showing ${isBullish ? "bullish" : "bearish"} divergence.`,
        `Market structure favors ${isBullish ? "upside" : "downside"} movement. Watch for breakout ${isBullish ? "above" : "below"} key level.`,
      ];

      setPrediction({
        direction: isBullish ? "bullish" : "bearish",
        confidence: Math.floor(65 + Math.random() * 25),
        entry: parseFloat(entry.toFixed(decimals)),
        stopLoss: parseFloat(stopLoss.toFixed(decimals)),
        takeProfit1: parseFloat(takeProfit1.toFixed(decimals)),
        takeProfit2: parseFloat(takeProfit2.toFixed(decimals)),
        takeProfit3: parseFloat(takeProfit3.toFixed(decimals)),
        support: parseFloat(support.toFixed(decimals)),
        resistance: parseFloat(resistance.toFixed(decimals)),
        riskReward: parseFloat(riskReward.toFixed(2)),
        analysis: analyses[Math.floor(Math.random() * analyses.length)],
      });

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Prediction</h2>
          <p className="text-xs text-muted-foreground">
            Neural network analysis for {selectedIndex.symbol}
          </p>
        </div>
      </div>

      {/* Predict Button */}
      <Button
        onClick={generatePrediction}
        disabled={isLoading}
        className="w-full mb-6 h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing Market...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Generate Prediction
          </>
        )}
      </Button>

      {prediction && (
        <div className="space-y-4 animate-fade-in">
          {/* Direction & Confidence */}
          <div
            className={cn(
              "p-4 rounded-lg border",
              prediction.direction === "bullish"
                ? "bg-success/10 border-success/30"
                : "bg-destructive/10 border-destructive/30"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold",
                  prediction.direction === "bullish"
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                )}
              >
                {prediction.direction === "bullish" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {prediction.direction.toUpperCase()}
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="text-2xl font-bold text-primary">
                  {prediction.confidence}%
                </p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  prediction.direction === "bullish" ? "bg-success" : "bg-destructive"
                )}
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
          </div>

          {/* Entry Point */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Entry Point</span>
            </div>
            <p className="font-mono text-2xl font-bold text-primary">
              {formatPrice(prediction.entry)}
            </p>
          </div>

          {/* Take Profit Levels */}
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-foreground">
                Take Profit Levels
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">TP1</span>
                <span className="font-mono font-semibold text-success">
                  {formatPrice(prediction.takeProfit1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">TP2</span>
                <span className="font-mono font-semibold text-success">
                  {formatPrice(prediction.takeProfit2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">TP3</span>
                <span className="font-mono font-semibold text-success">
                  {formatPrice(prediction.takeProfit3)}
                </span>
              </div>
            </div>
          </div>

          {/* Stop Loss */}
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-destructive" />
              <span className="text-sm font-semibold text-foreground">Stop Loss</span>
            </div>
            <p className="font-mono text-xl font-bold text-destructive">
              {formatPrice(prediction.stopLoss)}
            </p>
          </div>

          {/* Support & Resistance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Support</p>
              <p className="font-mono font-semibold text-success">
                {formatPrice(prediction.support)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Resistance</p>
              <p className="font-mono font-semibold text-destructive">
                {formatPrice(prediction.resistance)}
              </p>
            </div>
          </div>

          {/* Risk/Reward */}
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Risk/Reward Ratio</span>
              <span className="font-mono font-bold text-accent">
                1:{prediction.riskReward}
              </span>
            </div>
          </div>

          {/* Analysis */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {prediction.analysis}
            </p>
          </div>
        </div>
      )}

      {!prediction && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Click the button above to generate AI prediction</p>
        </div>
      )}

      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          ⚠️ AI predictions are for informational purposes only. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default AIPrediction;
