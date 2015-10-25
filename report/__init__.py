from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)

from report import views
app.config["MONGODB_SETTINGS"] = {'DB': "survey-test"}
app.config["SECRET_KEY"] = "Some Secret Key"

db=MongoEngine(app)