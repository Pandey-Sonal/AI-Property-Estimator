import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score, mean_absolute_error
from xgboost import XGBRegressor
import joblib

# Load dataset
df = pd.read_csv("../Data/Pune house data.csv")

print("Dataset Loaded ✅")

# Clean column names
df.columns = df.columns.str.strip()

# Rename columns
df.rename(columns={
    "site_location": "location",
    "size": "bhk",
    "total_sqft": "sqft",
    "bath": "bathrooms"
}, inplace=True)

# Extract BHK number
df['bhk'] = df['bhk'].str.extract('(\d+)').astype(float)

# Convert sqft
def convert_sqft(x):
    try:
        if '-' in str(x):
            a, b = x.split('-')
            return (float(a) + float(b)) / 2
        return float(x)
    except:
        return None

df['sqft'] = df['sqft'].apply(convert_sqft)

# 🔥 CREATE CORRIDOR COLUMN
def map_corridor(loc):
    loc = str(loc).lower()

    if any(x in loc for x in ["hadapsar", "kharadi", "wagholi", "mundhwa", "magarpatta"]):
        return "Dehu-Solapur"
    else:
        return "Kolhapur-Nashik"

df['corridor'] = df['location'].apply(map_corridor)

# Add missing features
df['floor'] = 1
df['parking'] = 1
df['lift'] = 1

# Drop missing
df = df.dropna()

# Encode corridor
le = LabelEncoder()
df['corridor'] = le.fit_transform(df['corridor'])

# Features & target
X = df[['corridor', 'bhk', 'sqft', 'bathrooms', 'floor', 'parking', 'lift']]
y = df['price']

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)

# Train
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print("\nModel Performance 📊")
print("R2 Score:", r2_score(y_test, y_pred))
print("MAE:", mean_absolute_error(y_test, y_pred))

# Save
joblib.dump(model, "model.pkl")
joblib.dump(le, "encoder.pkl")

print("\nModel saved successfully 🚀")