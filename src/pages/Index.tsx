import { useState } from "react";
import Header from "@/components/Header";
import IndexCard from "@/components/IndexCard";
import PriceChart from "@/components/PriceChart";
import AIPrediction from "@/components/AIPrediction";
import MarketStats from "@/components/MarketStats";
import { useLivePrices } from "@/hooks/useLivePrices";

const Index = () => {
  const indices = useLivePrices();
  const [selectedIndex, setSelectedIndex] = useState(indices[0]);

  // Keep selected index in sync with live data
  const currentSelectedIndex =
    indices.find((i) => i.id === selectedIndex.id) || indices[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Market Stats */}
        <MarketStats />

        {/* Indices Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Market Indices
            </h2>
            <span className="text-xs text-muted-foreground">
              Live prices • Updated every 2s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {indices.map((index, idx) => (
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
