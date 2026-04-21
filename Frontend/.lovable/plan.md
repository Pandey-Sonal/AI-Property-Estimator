
## AI Property Price Predictor — Plan

A single-page app for predicting property prices along two Maharashtra corridors with a side-by-side comparison view.

### Layout
- Centered container, soft gradient background, clean card-based UI
- Header: app title + short tagline
- Two main sections stacked: **Predictor** and **Corridor Comparison**

### 1. Prediction Form (Card)
Inputs:
- **Corridor** — dropdown (Dehu-Solapur, Kolhapur-Nashik)
- **BHK** — number input (1–5)
- **Square feet** — number input
- **Bathrooms** — number input
- **Floor** — number input
- **Amenities** — checkboxes for Parking & Lift
- **Predict** button (primary, full-width on mobile)

### 2. Result Card
- Appears after clicking Predict
- Large price display in **₹ Lakhs**
- Subtext: corridor name + key inputs summary
- Subtle highlight/shadow, animated fade-in

### 3. Comparison Section
- Two cards side by side (stacks on mobile), one per corridor
- Each shows the predicted price for the same inputs, plus a small breakdown (base rate, amenity bonus)
- Highlights the cheaper option with a small badge

### Prediction Logic (client-side heuristic)
Simple transparent formula so the UI feels real:
- Base rate per sqft: Dehu-Solapur ₹4,500 · Kolhapur-Nashik ₹5,200
- Multipliers: BHK, bathrooms, floor (small bump per floor)
- Amenity add-ons: Parking +2%, Lift +3%
- Output rounded to 2 decimals in ₹ Lakhs

### Design System
- Soft palette: off-white background, indigo/teal accent, muted grays
- Rounded-2xl cards, subtle shadows, generous spacing
- Tailwind + shadcn components (Card, Input, Select, Checkbox, Button, Badge)
- Lucide icons (Home, IndianRupee, Building2, MapPin)

### Files
- Replace `src/pages/Index.tsx` with the full UI
- Add `src/components/PredictorForm.tsx`, `ResultCard.tsx`, `ComparisonSection.tsx`
- Add `src/lib/predict.ts` with the pricing function
- Update `src/index.css` design tokens for the soft palette
