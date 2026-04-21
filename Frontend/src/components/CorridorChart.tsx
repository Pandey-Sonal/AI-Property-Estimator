import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { CORRIDORS, predictPrice, type PredictInput } from "@/lib/predict";

type Props = {
  input: any;
  result: any;
};

const CorridorChart = ({ input }: Props) => {
  const data = CORRIDORS.map((c) => ({
    name: c.label,
    value: predictPrice({ ...input, corridor: c.value }).totalLakhs,
    corridor: c.value,
  }));
  const cheapest = data.reduce((a, b) => (a.value <= b.value ? a : b));

  return (
    <section className="rounded-3xl bg-card border border-border/70 shadow-soft p-7 sm:p-9">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Visual breakdown
        </p>
        <h2 className="font-serif-display text-3xl font-semibold text-foreground mt-1">
          Price chart
        </h2>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              unit="L"
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary) / 0.5)" }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontFamily: "Inter, sans-serif",
              }}
              formatter={(v: number) => [`₹${v} L`, "Estimate"]}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.corridor}
                  fill={d.corridor === cheapest.corridor ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CorridorChart;
