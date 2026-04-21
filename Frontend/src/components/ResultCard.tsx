import { Sparkles } from "lucide-react";
import { getCorridor, type PredictInput } from "@/lib/predict";
import AnimatedNumber from "./AnimatedNumber";

type Props = {
  input: PredictInput;
  result: number; // ✅ backend sends a number (price)
};

const ResultCard = ({ input, result }: Props) => {
  const corridor = getCorridor(input.corridor);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-accent/40 shadow-elevated p-8 sm:p-10">
      
      {/* Background effects */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/40 blur-3xl pointer-events-none" />

      <div className="relative">
        
        {/* Title */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Estimated Value
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2 flex-wrap">
          <span className="font-serif-display text-2xl text-muted-foreground">₹</span>
          
          <span className="font-serif-display text-6xl sm:text-7xl font-semibold text-foreground tabular-nums leading-none">
            <AnimatedNumber value={result} />
          </span>

          <span className="font-serif-display text-2xl text-muted-foreground">Lakhs</span>
        </div>

        {/* Details */}
        <p className="mt-5 text-sm text-foreground/80">
          <span className="font-medium">{corridor.label}</span> corridor ·{" "}
          {input.bhk} BHK ·{" "}
          {input.sqft.toLocaleString("en-IN")} sqft · Floor {input.floor}
        </p>

        {/* Simple Stats (SAFE) */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat
            label="Price"
            value={`₹ ${result.toLocaleString("en-IN")}`}
            suffix="L"
          />
          <Stat
            label="Type"
            value={`${input.bhk} BHK`}
          />
          <Stat
            label="Area"
            value={`${input.sqft.toLocaleString("en-IN")} sqft`}
          />
        </div>
      </div>
    </section>
  );
};

const Stat = ({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) => (
  <div className="rounded-2xl bg-background/60 backdrop-blur px-4 py-3 border border-border/50">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 font-serif-display text-lg font-semibold text-foreground">
      {value}
      {suffix && (
        <span className="text-xs font-sans font-medium text-muted-foreground ml-0.5">
          {suffix}
        </span>
      )}
    </p>
  </div>
);

export default ResultCard;