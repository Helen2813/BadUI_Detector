from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
from segment_image import segment_image

app = Flask(__name__)

from flask_cors import CORS
CORS(app)


@app.route('/process_image', methods=['POST'])
def process_image():
    file = request.files['image']
    image = np.array(Image.open(io.BytesIO(file.read())))
    
    blocks = segment_image(image)
    
    return jsonify({"blocks": blocks})

if __name__ == '__main__':
    app.run(debug=True)
