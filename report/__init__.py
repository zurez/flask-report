from flask import Flask

# from flask.ext.triangle import Triangle

app = Flask(__name__)

from report import views
