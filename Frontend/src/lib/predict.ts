// ✅ TYPES
export type Corridor = "Dehu-Solapur" | "Kolhapur-Nashik";

export type PredictInput = {
  corridor: Corridor;
  bhk: number;
  sqft: number;
  bathrooms: number;
  floor: number;
  parking: number; // 0 or 1
  lift: number;    // 0 or 1
};

// ✅ DATA (label = UI, value = what backend expects)
export const CORRIDORS = [
  { label: "Dehu Road → Solapur", value: "Dehu-Solapur", baseRate: 5500 },
  { label: "Kolhapur Road → Nashik", value: "Kolhapur-Nashik", baseRate: 6000 },
] as const;

// ✅ SAFE GETTER
export function getCorridor(value: Corridor) {
  return CORRIDORS.find((c) => c.value === value) ?? CORRIDORS[0];
}

// ✅ OUTPUT TYPE
export interface PredictionBreakdown {
  baseRate: number;
  basePrice: number;
  bhkBonus: number;
  bathBonus: number;
  floorBonus: number;
  amenityPct: number;
  total: number;
  totalLakhs: number;
}

// ✅ CORE LOGIC
export function predictPrice(input: PredictInput): PredictionBreakdown {
  const corridor = getCorridor(input.corridor);

  const sqft = Math.max(0, input.sqft);
  const bhk = Math.max(1, input.bhk);
  const bathrooms = Math.max(1, input.bathrooms);
  const floor = Math.max(0, input.floor);

  const baseRate = corridor.baseRate;
  const basePrice = baseRate * sqft;

  const bhkBonus = basePrice * 0.03 * (bhk - 1);
  const bathBonus = basePrice * 0.015 * (bathrooms - 1);
  const floorBonus = basePrice * 0.005 * floor;

  let amenityPct = 0;
  if (input.parking === 1) amenityPct += 0.02;
  if (input.lift === 1) amenityPct += 0.03;

  const subtotal = basePrice + bhkBonus + bathBonus + floorBonus;
  const total = subtotal * (1 + amenityPct);

  const totalLakhs = Number((total / 100000).toFixed(2));

  return {
    baseRate,
    basePrice,
    bhkBonus,
    bathBonus,
    floorBonus,
    amenityPct,
    total,
    totalLakhs,
  };
}

// ✅ FORMAT
export function formatLakhs(lakhs: number) {
  return `₹ ${lakhs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} L`;
}