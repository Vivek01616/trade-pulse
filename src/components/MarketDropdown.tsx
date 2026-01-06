import { useState } from "react";
import { Search, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { IndexData } from "@/data/indices";
import { cn } from "@/lib/utils";

interface MarketDropdownProps {
  indices: IndexData[];
  selectedIndex: IndexData;
  onSelect: (index: IndexData) => void;
}

const MarketDropdown = ({ indices, selectedIndex, onSelect }: MarketDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "index" | "forex">("all");

  const filteredIndices = indices.filter((index) => {
    const matchesSearch =
      index.symbol.toLowerCase().includes(search.toLowerCase()) ||
      index.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || index.category === filter;
    return matchesSearch && matchesFilter;
  });

  const forexCount = indices.filter((i) => i.category === "forex").length;
  const indexCount = indices.filter((i) => i.category === "index").length;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-[280px] justify-between bg-secondary/50 border-border hover:bg-secondary"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">{selectedIndex.symbol}</span>
          <span className="text-muted-foreground text-sm truncate max-w-[120px]">
            {selectedIndex.name}
          </span>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-full sm:w-[350px] bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Search */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 p-2 border-b border-border bg-secondary/30">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                All ({indices.length})
              </Button>
              <Button
                variant={filter === "index" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("index")}
                className="text-xs"
              >
                Indices ({indexCount})
              </Button>
              <Button
                variant={filter === "forex" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("forex")}
                className="text-xs"
              >
                Forex ({forexCount})
              </Button>
            </div>

            {/* Markets List */}
            <div className="max-h-[300px] overflow-y-auto">
              {filteredIndices.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No markets found
                </div>
              ) : (
                filteredIndices.map((index) => (
                  <button
                    key={index.id}
                    onClick={() => {
                      onSelect(index);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors",
                      selectedIndex.id === index.id && "bg-primary/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {index.symbol}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                            {index.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {index.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-foreground">
                        {index.category === "forex" && index.price < 10
                          ? index.price.toFixed(5)
                          : index.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                      </p>
                      <p
                        className={cn(
                          "text-xs font-mono flex items-center justify-end gap-1",
                          index.change >= 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {index.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {index.change >= 0 ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketDropdown;
