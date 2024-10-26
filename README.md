# BadUI_Detector

Prerequisites

Ensure you have Python 3.7+ installed on your system.
A modern web browser (such as Chrome, Firefox, or Edge) is recommended for viewing the frontend.

Setup Instructions

1. Clone the Repository
Clone the GitHub repository to your local machine.

2. Set up a Virtual Environment (Recommended)
Setting up a virtual environment will isolate the dependencies for this project.

python3 -m venv venv
source venv/bin/activate  # For macOS/Linux
# or
venv\Scripts\activate     # For Windows

3. Install Required Libraries
Install the necessary libraries listed in requirements.txt.

pip install -r requirements.txt

4. Start the Server
Run the Flask server:

python server.py

5. Open the Frontend
Open the index.html file in a web browser. You can either double-click it to open it directly in your default browser or open it using a specific browser from the command line.

6. Usage
Upload an Image: Use the "Choose File" button to upload a UI screenshot.
Interactive Segmentation: The uploaded image will be segmented into blocks. Hover over each block to see the highlight effect.