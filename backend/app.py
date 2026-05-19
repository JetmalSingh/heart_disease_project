from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend to talk to Flask

# Load model and scaler
MODEL_PATH  = '../models/heart_model.pkl'
SCALER_PATH = '../models/scaler.pkl'

model  = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

print("✅ Model and scaler loaded successfully!")

# ── Feature names (same order as training) ──────────────────
FEATURES = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
            'restecg', 'thalach', 'exang', 'oldpeak',
            'slope', 'ca', 'thal']

# ────────────────────────────────────────────────────────────
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Heart Disease Prediction API is running!',
        'status':  'OK'
    })

# ────────────────────────────────────────────────────────────
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract features in correct order
        features = [float(data[f]) for f in FEATURES]
        features_array = np.array(features).reshape(1, -1)

        # Scale input
        features_scaled = scaler.transform(features_array)

        # Predict
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]

        result = {
            'prediction':        int(prediction),
            'result_label':      'Heart Disease Detected' if prediction == 1 else 'No Heart Disease',
            'probability_disease': round(float(probability[1]) * 100, 2),
            'probability_no_disease': round(float(probability[0]) * 100, 2),
            'risk_level': (
                'High Risk'    if probability[1] >= 0.7 else
                'Moderate Risk' if probability[1] >= 0.4 else
                'Low Risk'
            )
        }

        return jsonify({'success': True, 'data': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

# ────────────────────────────────────────────────────────────
@app.route('/model-info', methods=['GET'])
def model_info():
    return jsonify({
        'model_type':   type(model).__name__,
        'features':     FEATURES,
        'total_features': len(FEATURES),
        'description':  'Random Forest Classifier trained on Cleveland Heart Disease Dataset'
    })

# ────────────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, port=5000)