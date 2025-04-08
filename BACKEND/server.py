from flask import Flask, request, jsonify
import cv2
import pytesseract
from PIL import Image
import numpy as np

app = Flask(__name__)

def preprocess_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    processed = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    return processed

def extract_text(image):
    processed_image = preprocess_image(image)
    temp_path = "processed_image.png"
    cv2.imwrite(temp_path, processed_image)
    text = pytesseract.image_to_string(Image.open(temp_path), lang="eng", config="--psm 6")
    return text

@app.route("/extract-text", methods=["POST"])
def extract_text_api():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    file_path = "uploaded_image.png"
    file.save(file_path)
    
    extracted_text = extract_text(file_path)
    return jsonify({"extracted_text": extracted_text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
