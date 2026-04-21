import axios from "axios";
import { useState } from "react";
import { Calculator, GitCompare } from "lucide-react";
import { type PredictInput } from "@/lib/predict";

import PredictorForm from "@/components/PredictorForm";
import ResultCard from "@/components/ResultCard";
import ComparisonSection from "@/components/ComparisonSection";
import CorridorChart from "@/components/CorridorChart";

const API = "http://127.0.0.1:8002";

const Index = () => {
  const [values, setValues] = useState<PredictInput>({
    corridor: "Dehu-Solapur",
    bhk: 2,
    sqft: 1000,
    bathrooms: 2,
    floor: 3,
    parking: 1,
    lift: 1,
  });

  const [price, setPrice] = useState<number | null>(null);
  const [compare, setCompare] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [showPredict, setShowPredict] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const handleChange = (next: Partial<PredictInput>) => {
    setValues((prev) => ({
      ...prev,
      ...next,
    }));
  };

  // 🔥 PREDICT
  const handlePredict = async () => {
    setLoading(true);
    setShowPredict(false);

    try {
      const res = await axios.post(`${API}/predict`, values);

      if (!res.data?.price) return;

      setPrice(res.data.price);
      setShowPredict(true);
      setShowCompare(false);
    } catch (err) {
      console.error("Predict error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 COMPARE
  const handleCompare = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/compare`, values);

      if (!res.data) return;

      setCompare(res.data);
      setShowPredict(true);
      setShowCompare(true);
    } catch (err) {
      console.error("Compare error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-6 py-12">

        
        <section className="mb-16">

  {/* TOP BAR */}
  <div className="flex items-center justify-between mb-10">
    
    {/* Logo */}
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary))] 
      flex items-center justify-center text-white font-semibold">
        A
      </div>
      <span className="font-serif-display text-xl text-foreground">
        Archimedes
      </span>
    </div>

    {/* Right text */}
    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
      AI Property Estimator
    </span>
  </div>

  {/* SMALL TAG */}
  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
    Maharashtra · Two Corridors
  </p>

  {/* BIG HEADING */}
  <h1 className="text-5xl sm:text-6xl font-serif-display leading-tight text-foreground">
    Discover what your <br />
    property is{" "}
    <span className="text-primary italic">truly worth.</span>
  </h1>

  {/* SUBTEXT */}
  <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
    Compose the property, then predict the estimate or compare both
    Dehu–Solapur and Kolhapur–Nashik corridors side by side.
  </p>

</section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">

            <PredictorForm values={values} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-4">

              {/* 🟤 PREDICT BUTTON */}
              <button
                onClick={handlePredict}
                disabled={loading}
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] 
                px-5 py-3 rounded-xl flex items-center justify-center gap-2 
                shadow-soft transition-all duration-200 
                hover:scale-105 hover:shadow-elevated 
                active:scale-95 disabled:opacity-50"
              >
                <Calculator className="h-4 w-4" />
                {loading ? "Analyzing..." : "Predict"}
              </button>

              {/* 🤍 COMPARE BUTTON */}
              <button
                onClick={handleCompare}
                disabled={loading}
                className="border border-border 
                bg-card text-foreground 
                px-5 py-3 rounded-xl flex items-center justify-center gap-2 
                transition-all duration-200 
                hover:bg-secondary hover:scale-105 
                active:scale-95 disabled:opacity-50"
              >
                <GitCompare className="h-4 w-4" />
                Compare
              </button>

            </div>

            {/* 🤖 AI LOADING TEXT */}
            {loading && (
              <div className="text-sm text-muted-foreground text-center mt-2 animate-pulse">
                🤖 AI is analyzing your property...
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3 space-y-6">

            {showPredict && price !== null && (
              <ResultCard input={values} result={price} />
            )}

            {showCompare && compare && (
              <>
                <ComparisonSection input={values} result={compare} />
                <CorridorChart input={values} result={compare} />
              </>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-center text-sm text-muted-foreground">
          Built with AI + React + FastAPI
        </footer>

      </div>
    </main>
  );
};

export default Index;