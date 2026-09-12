from flask import Flask

# Initiate the app
app = Flask(__name__)

# Test
@app.route("/")
def home():
    return {
        "message": "AI service is working!"
    }, 200

# Your AI inferencing here...
# For training, create a separate train.py or something similar then save the model.