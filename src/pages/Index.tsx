import { useState } from "react";
import Header from "@/components/Header";
import IndexCard from "@/components/IndexCard";
import PriceChart from "@/components/PriceChart";
import AIPrediction from "@/components/AIPrediction";
import MarketStats from "@/components/MarketStats";
import MarketDropdown from "@/components/MarketDropdown";
import { useLivePrices } from "@/hooks/useLivePrices";

const Index = () => {
  const indices = useLivePrices();
  const [selectedIndex, setSelectedIndex] = useState(indices[0]);

  // Keep selected index in sync with live data
  const currentSelectedIndex =
    indices.find((i) => i.id === selectedIndex.id) || indices[0];

  // Show top 8 indices in the grid
  const displayedIndices = indices.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Market Stats */}
        <MarketStats />

        {/* Market Dropdown */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Select Market
            </h2>
            <MarketDropdown
              indices={indices}
              selectedIndex={currentSelectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>
        </section>

        {/* Indices Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Popular Markets
            </h2>
            <span className="text-xs text-muted-foreground">
              Live prices • Updated every 2s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedIndices.map((index, idx) => (
              <div key={index.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <IndexCard
                  index={index}
                  isSelected={currentSelectedIndex.id === index.id}
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Chart and AI Prediction */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart selectedIndex={currentSelectedIndex} />
          </div>
          <div>
            <AIPrediction selectedIndex={currentSelectedIndex} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            TradePulse © 2026 • AI-Powered Market Intelligence •{" "}
            <span className="text-primary">Real-time data simulation</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
