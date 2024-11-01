import cv2

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