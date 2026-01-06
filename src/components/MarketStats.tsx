import { Activity, BarChart3, Clock, Globe } from "lucide-react";

const MarketStats = () => {
  const stats = [
    {
      icon: Activity,
      label: "Market Status",
      value: "Open",
      subtext: "NYSE & NASDAQ",
      color: "text-success",
    },
    {
      icon: Clock,
      label: "Time to Close",
      value: "4h 23m",
      subtext: "Eastern Time",
      color: "text-primary",
    },
    {
      icon: BarChart3,
      label: "Trading Volume",
      value: "$42.8B",
      subtext: "+12% vs avg",
      color: "text-accent",
    },
    {
      icon: Globe,
      label: "Global Markets",
      value: "7/9 Open",
      subtext: "Major exchanges",
      color: "text-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="glass-card p-4 flex items-center gap-3"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
