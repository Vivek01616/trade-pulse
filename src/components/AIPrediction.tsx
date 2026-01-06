import { Brain, TrendingUp, TrendingDown, AlertTriangle, Sparkles } from "lucide-react";
import { IndexData } from "@/data/indices";
import { cn } from "@/lib/utils";

interface AIPredictionProps {
  selectedIndex: IndexData;
}

const AIPrediction = ({ selectedIndex }: AIPredictionProps) => {
  // Simulated AI predictions based on index data
  const predictions = {
    shortTerm: {
      direction: selectedIndex.change >= 0 ? "bullish" : "bearish",
      confidence: Math.floor(65 + Math.random() * 25),
      target: selectedIndex.price * (selectedIndex.change >= 0 ? 1.02 : 0.98),
    },
    mediumTerm: {
      direction: Math.random() > 0.4 ? "bullish" : "bearish",
      confidence: Math.floor(55 + Math.random() * 30),
      target:
        selectedIndex.price * (Math.random() > 0.4 ? 1.05 : 0.95),
    },
    signals: [
      {
        type: "momentum",
        value: selectedIndex.change >= 0 ? "Strong Buy" : "Hold",
        strength: selectedIndex.change >= 0 ? 85 : 45,
      },
      {
        type: "volatility",
        value: Math.abs(selectedIndex.changePercent) > 1 ? "High" : "Low",
        strength: Math.abs(selectedIndex.changePercent) * 30,
      },
      {
        type: "trend",
        value: selectedIndex.change >= 0 ? "Uptrend" : "Downtrend",
        strength: Math.abs(selectedIndex.changePercent) * 25 + 50,
      },
    ],
  };

  const isBullish = predictions.shortTerm.direction === "bullish";

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
        <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-primary">AI Powered</span>
        </div>
      </div>

      <div className="grid gap-4 mb-6">
        {/* Short Term Prediction */}
        <div
          className={cn(
            "p-4 rounded-lg border",
            isBullish
              ? "bg-success/5 border-success/20"
              : "bg-destructive/5 border-destructive/20"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              24h Prediction
            </span>
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
                isBullish
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {isBullish ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {predictions.shortTerm.direction.toUpperCase()}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Target Price</p>
              <p className="font-mono text-xl font-bold text-foreground">
                {predictions.shortTerm.target.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Confidence</p>
              <p className="font-mono text-xl font-bold text-primary">
                {predictions.shortTerm.confidence}%
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                isBullish ? "bg-success" : "bg-destructive"
              )}
              style={{ width: `${predictions.shortTerm.confidence}%` }}
            />
          </div>
        </div>

        {/* Medium Term Prediction */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              7-Day Outlook
            </span>
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
                predictions.mediumTerm.direction === "bullish"
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {predictions.mediumTerm.direction === "bullish" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {predictions.mediumTerm.direction.toUpperCase()}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Target:</span>
            <span className="font-mono font-semibold text-foreground">
              {predictions.mediumTerm.target.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Confidence:</span>
            <span className="font-mono font-semibold text-primary">
              {predictions.mediumTerm.confidence}%
            </span>
          </div>
        </div>
      </div>

      {/* Trading Signals */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          Trading Signals
        </h3>
        <div className="space-y-2">
          {predictions.signals.map((signal, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30"
            >
              <div>
                <p className="text-xs text-muted-foreground capitalize">
                  {signal.type}
                </p>
                <p className="text-sm font-medium text-foreground">{signal.value}</p>
              </div>
              <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                  style={{ width: `${Math.min(signal.strength, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          ⚠️ AI predictions are for informational purposes only. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default AIPrediction;
