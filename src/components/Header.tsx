import { TrendingUp, Activity, Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="glass-card border-b border-glass-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">TradePulse</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Trading</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Markets
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Portfolio
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            AI Insights
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <Activity className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">Markets Open</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
