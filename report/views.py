from report import app
from flask import render_template,jsonify
from flask import make_response,request
import requests
import json
from flask.ext.triangle import Triangle

@app.errorhandler(404)
def not_found(error):

    return make_response(jsonify({'error': 'Not found'}), 404)
@app.route("/report/12/console",methods=['POST'])
def response_post():
	data = json.loads(request.data.decode())
	keys= data.keys()
	return data["cid"]
	return type(data)

@app.route("/report/<userid>/console/")

def show_console(userid):
	# Check if ths user id has access to the perticular console
	# if yes , redirect to console
	# if no generate an error
	if len(userid)==0:
		abort(404)
	user={
	"name":"John Doe",
	"id":userid,
	"content":"Red John"
	}
	return render_template("console.html",title="John Doe",user=user)
@app.route("/report/<userid>/console/q/<cid>")

def init(userid,cid):
	if len(userid)==0 or len(cid)==0:
		abort(404)
	# This part will come from database
	data={
	
	"cid":cid,
	"total_responses":1300,
	"options":{
				"A":{
				"label":"Option1",
				"responses":400,
				"gender":{
					"male":100,
					"female":200,
					"others":100
				},
				"age":{
					"u_18":200,
					"b_18_25":100,
					"a_25":100
				}

				,
				},
				"B":{
				"label":"Option2",
				"responses":500,
				"gender":{
				"male":200,
				"female":100,
				"others":200
				},
				"age":{
				"u_18":200,
				"b_18_25":100,
				"a_25":100
				}
				}
	}
	
	}
	return make_response(jsonify(data))
	
@app.route("/test")
def test():
	return render_template("test.html")
@app.route("/api")
def random_data():
	import random
	import json
	types=["pie","bar"]
	toss= random.randint(0,1)
	if toss==0:
		data={"typ":"pie","values":[{"value":random.randint(200,1200),"color":"#F7464A","highlight":"#FF5A5E","label": "Red"},
    {
        "value": random.randint(200,1200),
        "color": "#46BFBD",
        "highlight": "#5AD3D1",
        "label": "Green"
    },
    {
        "value":random.randint(200,1200),
        "color":"#FDB45C",
        "highlight": "#FFC870",
        "label":"Yellow"
    }
		]
		}
	elif toss==1:
		aList=["January", "February", "March", "April", "May", "June", "July"]
		# typ="bar"
		random.randint(20,100)
		data={
		"typ":"bar",
		"labels":aList ,
    	"values": [
        {
            "label": "My First dataset",
            "fillColor": "rgba(220,220,220,0.5)",
            "strokeColor": "rgba(220,220,220,0.8)",
            "highlightFill": "rgba(220,220,220,0.75)",
            "highlightStroke": "rgba(220,220,220,1)",
            "data": [random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100)]
        },
        {
            "label": "My Second dataset",
            "fillColor": "rgba(151,187,205,0.5)",
            "strokeColor": "rgba(151,187,205,0.8)",
            "highlightFill": "rgba(151,187,205,0.75)",
            "highlightStroke": "rgba(151,187,205,1)",
            "data": [random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100), random.randint(20,100)]
        }
    ]
		}

	return make_response(jsonify(data))
