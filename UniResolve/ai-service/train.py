from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

BASE_DIR = Path(__file__).parent
DATASET = BASE_DIR / "data" / "complaints.csv"
MODEL_DIR = BASE_DIR / "models"


def build_pipeline():
    return Pipeline([("tfidf", TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=1)), ("classifier", LogisticRegression(max_iter=1000))])


def main():
    data = pd.read_csv(DATASET)
    data["text"] = data["title"].fillna("") + " " + data["description"].fillna("")
    try:
        train_text, test_text, train_category, test_category = train_test_split(data["text"], data["category"], test_size=0.2, random_state=42, stratify=data["category"])
        _, _, train_priority, test_priority = train_test_split(data["text"], data["priority"], test_size=0.2, random_state=42, stratify=data["category"])
        category_model = build_pipeline().fit(train_text, train_category)
        priority_model = build_pipeline().fit(train_text, train_priority)
        print("Category model")
        print(classification_report(test_category, category_model.predict(test_text), zero_division=0))
        print("Priority model")
        print(classification_report(test_priority, priority_model.predict(test_text), zero_division=0))
    except ValueError as e:
        print(f"Stratified split failed ({e}). Training on full dataset.")
        category_model = build_pipeline().fit(data["text"], data["category"])
        priority_model = build_pipeline().fit(data["text"], data["priority"])
    MODEL_DIR.mkdir(exist_ok=True)
    joblib.dump({"category": category_model, "priority": priority_model}, MODEL_DIR / "complaint_model.joblib")
    print("Model trained and saved successfully!")


if __name__ == "__main__":
    main()
