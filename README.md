# 🏡 AI Property Estimator

🌍 Live Demo

👉 https://your-vercel-app.vercel.app

⚙️ Backend API

👉 https://ai-property-estimator.onrender.com

📄 API Docs

👉 https://ai-property-estimator.onrender.com/docs

---

## 🚀 Overview

**AI Property Estimator** is a full-stack machine learning web application that predicts real estate prices and compares two major property corridors:

👉 **Dehu Road → Solapur**
👉 **Kolhapur Road → Nashik**

Details like BHK, area, bathrooms, floor, and amenities to get **instant AI-based price predictions**.

---

## ✨ Features

* 🔮 **AI Price Prediction** using trained ML model (XGBoost)
* 📊 **Corridor Comparison** for better investment decisions
* 🎯 **Interactive UI** with sliders and animations
* ⚡ **Real-time predictions** via FastAPI backend
* 📈 **Visual charts** for price comparison
* 🧠 Smart feature handling:

  * BHK
  * Square footage
  * Bathrooms
  * Floor level
  * Parking & Lift

---

## 🧱 Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Recharts

### 🔹 Backend

* FastAPI
* Python
* XGBoost
* Scikit-learn
* Pandas
* Joblib

---

## 🧠 Machine Learning

* **Model Used:** XGBoost Regressor

* **Input Features:**

  * Corridor
  * BHK
  * Square Footage
  * Bathrooms
  * Floor
  * Parking & Lift

* **Output:**

  * Predicted price in Lakhs (₹)

---

## 📂 Project Structure

```
AI-Property-Estimator/
│
├── Backend/
│   ├── main.py
│   ├── model.pkl
│   ├── encoder.pkl
│   ├── requirements.txt
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│
├── Data/
│   └── Pune house data.csv
│
├── README.md
├── .gitignore
```

---

## ⚙️ Run Locally

### 🔹 Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

👉 Runs on: `http://127.0.0.1:8002`

---

### 🔹 Frontend

```bash
cd Frontend
npm install
npm run dev
```

👉 Runs on: `http://localhost:8080`

---

## 🔗 API Endpoints

### 📌 Predict Price

```http
POST /predict
```

#### Request:

```json
{
  "corridor": "Dehu-Solapur",
  "bhk": 2,
  "sqft": 1000,
  "bathrooms": 2,
  "floor": 3,
  "parking": 1,
  "lift": 1
}
```

---

### 📌 Compare Corridors

```http
POST /compare
```

---

## 🌍 Deployment

* 🔹 Frontend: Vercel
* 🔹 Backend: Render

This project demonstrates **end-to-end deployment of an ML application**.

---

## 📸 Screenshots

```
<img width="1505" height="794" alt="image" src="https://github.com/user-attachments/assets/b5de2852-5472-434d-bc37-52e4635f5993" />
<img width="1692" height="499" alt="image" src="https://github.com/user-attachments/assets/57d0c388-73e9-4cb1-8722-1074ce58c49e" />
<img width="941" height="894" alt="image" src="https://github.com/user-attachments/assets/b9cb4284-ca9e-4bf7-acb8-789c7fa9b43d" />



```

---

## 🎯 Future Improvements

* 📍 Add more corridors/locations
* 🗺️ Map-based property selection
* 🔐 User authentication
* 💾 Save prediction history
* 📊 Improve model accuracy with more data

---

## 🙌 Learnings

* Full-stack development (React + FastAPI)
* Deploying ML models in production
* API integration with frontend
* Debugging real-world deployment issues
* Handling CORS, environment configs, and hosting

---

## 👩‍💻 Author

**Sonal Pandey**
Final Year MCA Student | Aspiring Software Engineer

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 💬 Share feedback

---
