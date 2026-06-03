from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

# ==================================================
# Flask App Setup
# ==================================================

app = Flask(__name__)
CORS(app)

# ==================================================
# Load Model and Scaler
# ==================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "models", "heart_model.pkl")
)

SCALER_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "models", "scaler.pkl")
)

print("=" * 50)
print("BASE_DIR:", BASE_DIR)
print("MODEL_PATH:", MODEL_PATH)
print("SCALER_PATH:", SCALER_PATH)
print("=" * 50)

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)

    print("✅ Model and scaler loaded successfully!")

except Exception as e:
    print("❌ Error loading model/scaler:", str(e))
    model = None
    scaler = None

# ==================================================
# Features List
# ==================================================

FEATURES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal"
]

# ==================================================
# Home Route
# ==================================================

@app.route("/")
def home():
    return jsonify({
        "message": "Heart Disease Prediction API is running!",
        "status": "OK"
    })

# ==================================================
# Health Check Route
# ==================================================

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    })

# ==================================================
# Model Info Route
# ==================================================

@app.route("/model-info")
def model_info():

    if model is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded"
        }), 500

    return jsonify({
        "success": True,
        "model_type": type(model).__name__,
        "features": FEATURES,
        "total_features": len(FEATURES)
    })

# ==================================================
# Prediction Route
# ==================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        if model is None or scaler is None:
            return jsonify({
                "success": False,
                "error": "Model or scaler not loaded"
            }), 500

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "No input data provided"
            }), 400

        features = []

        for feature in FEATURES:

            if feature not in data:
                return jsonify({
                    "success": False,
                    "error": f"Missing feature: {feature}"
                }), 400

            features.append(float(data[feature]))

        features_array = np.array(features).reshape(1, -1)

        features_scaled = scaler.transform(features_array)

        prediction = int(model.predict(features_scaled)[0])

        probability = model.predict_proba(features_scaled)[0]

        disease_probability = float(probability[1]) * 100
        no_disease_probability = float(probability[0]) * 100

        if disease_probability >= 70:
            risk_level = "High Risk"
        elif disease_probability >= 40:
            risk_level = "Moderate Risk"
        else:
            risk_level = "Low Risk"

        result = {
            "prediction": prediction,
            "result_label": (
                "Heart Disease Detected"
                if prediction == 1
                else "No Heart Disease"
            ),
            "probability_disease": round(disease_probability, 2),
            "probability_no_disease": round(no_disease_probability, 2),
            "risk_level": risk_level
        }

        return jsonify({
            "success": True,
            "data": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# ==================================================
# Run App
# ==================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )