from flask import Flask, request, jsonify
import cv2
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

from flask_cors import CORS
CORS(app)


def segment_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
    )
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    blocks = []
    for i, cnt in enumerate(contours):
        x, y, w, h = cv2.boundingRect(cnt)

        if w * h > 500:
            blocks.append({"id": i, "coordinates": [x, y, x + w, y + h]})
    return blocks

@app.route('/process_image', methods=['POST'])
def process_image():
    file = request.files['image']
    image = np.array(Image.open(io.BytesIO(file.read())))
    
    blocks = segment_image(image)
    
    return jsonify({"blocks": blocks})

if __name__ == '__main__':
    app.run(debug=True)
