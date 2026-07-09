from flask import Flask, jsonify, request
from flask_cors import CORS

from predict import predict_complaint

app = Flask(__name__)
CORS(app)


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "uniresolve-ai"})


@app.post("/predict")
def predict():
    payload = request.get_json(force=True)
    return jsonify(predict_complaint(payload.get("title", ""), payload.get("description", "")))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
