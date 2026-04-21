import { MapPin, Zap } from "lucide-react";
import { CORRIDORS, type Corridor, type PredictInput } from "@/lib/predict";
import Stepper from "./Stepper";

type Props = {
  values: PredictInput;
  onChange: (value: PredictInput) => void;
};

const PredictorForm = ({ values, onChange }: Props) => {
  const set = <K extends keyof PredictInput>(key: K, v: PredictInput[K]) =>
    onChange({ ...values, [key]: v });

  return (
    <section className="rounded-3xl bg-card border border-border/70 shadow-soft p-7 sm:p-9">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Property Details
          </p>
          <h2 className="font-serif-display text-3xl font-semibold text-foreground mt-1">
            Compose your estimate
          </h2>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1.5">
          <Zap className="h-3 w-3" /> Live
        </span>
      </div>

      <div className="space-y-7">

        {/* CORRIDOR */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> Corridor
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {CORRIDORS.map((c) => {
              const active = values.corridor === c.value;

              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set("corridor", c.value as Corridor)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition text-left ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/60 text-foreground"
                  }`}
                >
                  <div className="font-serif-display text-base">
                    {c.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${
                    active ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    ₹{c.baseRate.toLocaleString("en-IN")}/sqft
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-border/70" />

        {/* STEPPERS */}
        <Stepper label="BHK" value={values.bhk} min={1} max={5} onChange={(v) => set("bhk", v)} />
        <Stepper label="Square feet" value={values.sqft} min={300} max={4000} step={50} unit="sqft" onChange={(v) => set("sqft", v)} />
        <Stepper label="Bathrooms" value={values.bathrooms} min={1} max={5} onChange={(v) => set("bathrooms", v)} />
        <Stepper label="Floor" value={values.floor} min={0} max={30} onChange={(v) => set("floor", v)} />

        <div className="h-px bg-border/70" />

        {/* AMENITIES */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Amenities
          </span>

          <div className="grid grid-cols-2 gap-2.5">

            {(["parking", "lift"] as const).map((key) => {
              const label = key === "parking" ? "Parking" : "Lift";
              const active = values[key];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...values,
                      [key]: active ? 0 : 1, // ✅ FIXED (no TS error)
                    })
                  }
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition flex items-center justify-between ${
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card hover:bg-secondary/60 text-muted-foreground"
                  }`}
                >
                  <span>{label}</span>

                  <span className={`relative h-5 w-9 rounded-full ${
                    active ? "bg-primary" : "bg-muted"
                  }`}>
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition ${
                        active ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </span>
                </button>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default PredictorForm;