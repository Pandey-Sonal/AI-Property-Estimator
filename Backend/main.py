from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "encoder.pkl"))

# Input schema
class Property(BaseModel):
    corridor: str
    bhk: int
    sqft: float
    bathrooms: int
    floor: int
    parking: int
    lift: int

@app.get("/")
def home():
    return {"message": "API running 🚀"}

# 🔹 Single prediction
@app.post("/predict")
def predict(data: Property):
    try:
        corridor = encoder.transform([data.corridor])[0]

        features = np.array([[
            corridor,
            data.bhk,
            data.sqft,
            data.bathrooms,
            data.floor,
            data.parking,
            data.lift
        ]])

        prediction = model.predict(features)[0]

        return {"price": round(float(prediction), 2)}

    except Exception as e:
        return {"error": str(e)}

# 🔥 NEW: Corridor comparison
@app.post("/compare")
def compare(data: Property):
    try:
        # Dehu-Solapur prediction
        d_corridor = encoder.transform(["Dehu-Solapur"])[0]
        d_features = np.array([[
            d_corridor,
            data.bhk,
            data.sqft,
            data.bathrooms,
            data.floor,
            data.parking,
            data.lift
        ]])
        d_price = model.predict(d_features)[0]

        # Kolhapur-Nashik prediction
        k_corridor = encoder.transform(["Kolhapur-Nashik"])[0]
        k_features = np.array([[
            k_corridor,
            data.bhk,
            data.sqft,
            data.bathrooms,
            data.floor,
            data.parking,
            data.lift
        ]])
        k_price = model.predict(k_features)[0]

        return {
            "Dehu-Solapur": round(float(d_price), 2),
            "Kolhapur-Nashik": round(float(k_price), 2)
        }

    except Exception as e:
        return {"error": str(e)}