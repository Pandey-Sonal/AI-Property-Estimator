import { TrendingDown } from "lucide-react";
import { CORRIDORS, predictPrice, type PredictInput } from "@/lib/predict";
import AnimatedNumber from "./AnimatedNumber";
type Props = {
  input: any;
  result: any;
};
const ComparisonSection = ({ input }: Props) => {
  const results = CORRIDORS.map((c) => ({
    corridor: c,
    result: predictPrice({ ...input, corridor: c.value }),
  }));
  const cheapest = results.reduce((a, b) => (a.result.total <= b.result.total ? a : b));
  const max = Math.max(...results.map((r) => r.result.totalLakhs));

  return (
    <section className="rounded-3xl bg-card border border-border/70 shadow-soft p-7 sm:p-9">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Side by side
          </p>
          <h2 className="font-serif-display text-3xl font-semibold text-foreground mt-1">
            Corridor comparison
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">Same specs, both corridors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(({ corridor, result }) => {
          const isCheapest = corridor.value === cheapest.corridor.value;
          const widthPct = max > 0 ? (result.totalLakhs / max) * 100 : 0;
          return (
            <div
              key={corridor.value}
              className={`rounded-2xl p-6 border transition ${
                isCheapest
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/60 bg-background/40"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Corridor
                  </p>
                  <h3 className="font-serif-display text-xl font-semibold text-foreground mt-0.5">
                    {corridor.label}
                  </h3>
                </div>
                {isCheapest && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                    <TrendingDown className="h-3 w-3" /> Best value
                  </span>
                )}
              </div>

              <p className="font-serif-display text-4xl font-semibold text-foreground tabular-nums">
                ₹<AnimatedNumber value={result.totalLakhs} />
                <span className="ml-1 text-base font-medium text-muted-foreground font-sans">L</span>
              </p>

              <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                    isCheapest ? "bg-primary" : "bg-primary/40"
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Base ₹{result.baseRate.toLocaleString("en-IN")}/sqft</span>
                <span>Amenities +{(result.amenityPct * 100).toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComparisonSection;
