import { TrendingUp, TrendingDown } from "lucide-react";
import { IndexData } from "@/data/indices";
import { cn } from "@/lib/utils";

interface IndexCardProps {
  index: IndexData;
  isSelected: boolean;
  onClick: () => void;
}

const IndexCard = ({ index, isSelected, onClick }: IndexCardProps) => {
  const isPositive = index.change >= 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in",
        isSelected && "ring-2 ring-primary glow-primary",
        isPositive ? "hover:border-success/30" : "hover:border-destructive/30"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground">{index.symbol}</span>
          <h3 className="text-sm font-semibold text-foreground">{index.name}</h3>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
            isPositive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive ? "+" : ""}
          {index.changePercent.toFixed(2)}%
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-mono text-xl font-semibold text-foreground">
          {index.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div
          className={cn(
            "font-mono text-sm",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {index.change.toFixed(2)}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">High</span>
          <p className="font-mono text-foreground">{index.high.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Low</span>
          <p className="font-mono text-foreground">{index.low.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
