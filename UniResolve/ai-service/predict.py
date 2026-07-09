from pathlib import Path

import joblib

MODEL_PATH = Path(__file__).parent / "models" / "complaint_model.joblib"
DEPARTMENTS = {
    "Hostel": "Hostel Administration",
    "Academics": "Academic Affairs",
    "Examination": "Examination Cell",
    "IT Support": "IT Support Desk",
    "Library": "Central Library",
    "Transport": "Transport Office",
    "Maintenance": "Campus Maintenance",
    "Mess & Cafeteria": "Food Services",
    "Security": "Campus Security",
    "Medical": "Health Centre",
}


def predict_complaint(title: str, description: str):
    text = f"{title} {description}".strip()
    if MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)
        category = model["category"].predict([text])[0]
        priority = model["priority"].predict([text])[0]
        confidence = max(model["category"].predict_proba([text])[0])
        return {"category": category, "priority": priority, "department": DEPARTMENTS.get(category, "Student Affairs"), "confidence": round(float(confidence), 3)}
    return heuristic_predict(text)


def heuristic_predict(text: str):
    lower = text.lower()
    rules = {
        "Hostel": ["hostel", "room", "warden", "washroom"],
        "Examination": ["exam", "admit card", "result", "marksheet"],
        "IT Support": ["portal", "login", "wifi", "internet", "password"],
        "Library": ["library", "book", "renewal"],
        "Transport": ["bus", "transport", "route"],
        "Maintenance": ["leak", "electric", "repair", "broken"],
        "Mess & Cafeteria": ["mess", "food", "cafeteria"],
        "Security": ["security", "theft", "unsafe"],
        "Medical": ["medical", "health", "clinic", "injury"],
    }
    category = "Academics"
    for label, terms in rules.items():
        if any(term in lower for term in terms):
            category = label
            break
    priority = "Low"
    if any(term in lower for term in ["urgent", "danger", "unsafe", "electric", "injury"]):
        priority = "Critical"
    elif any(term in lower for term in ["exam", "result", "deadline", "blocked"]):
        priority = "High"
    elif any(term in lower for term in ["not working", "delay", "failed", "repair"]):
        priority = "Medium"
    return {"category": category, "priority": priority, "department": DEPARTMENTS[category], "confidence": 0.68}
