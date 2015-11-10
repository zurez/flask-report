from report import app
from flask import render_template,jsonify
from flask import make_response,request,current_app
import requests
import json
# from flask.ext.triangle import Triangle
from functools import wraps
# @app.errorhandler(404)
# def not_found(error):

#     return make_response(jsonify({'error': 'Not found'}), 404)
@app.route("/report/12/console",methods=['POST'])
def response_post():
	data = json.loads(request.data.decode())
	keys= data.keys()
	return data["cid"]
	return type(data)

@app.route("/report/<userid>/console/")
@app.route("/report")
def show_console(userid="1"):
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

def init(userid="12",cid="1"):
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
	
@app.route("/survey/s:<id>/analysis")
def test(id):
	return render_template("test.html")

# JSONP
def support_jsonp(f):
    """Wraps JSONified output for JSONP"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            content = str(callback) + '(' + str(f().data) + ')'
            return current_app.response_class(content, mimetype='application/json')
        else:
            return f(*args, **kwargs)
    return decorated_function
@app.route("/api/<cid>")
# @support_jsonp
def random_data(cid):
	import random
	import json
	types=["pie","bar"]
	toss= random.randint(0,1)

	if toss==0:
		data =[
		{"cid":cid,
		"typ":"pie",
		"labels":["A","B","C"],
		"values":[random.randint(200,1200),random.randint(200,1200),random.randint(200,1200)]
		}
		]
		return jsonify(data =data)
		
	elif toss==1:
		data=[
		{
		"cid":cid,
		"typ":"bar",
		"labels":["A","B","C"],
		"values":[random.randint(20,100),random.randint(20,100),random.randint(20,100)]
		}
		]
		return jsonify(data =data)
	

	# return jsonify(data =data)

# REAL DEAL:

@app.route("/")
def show_page():
	return render_template("index.html")
@app.route("/api/survey/s:<s_id>/response/aggregate")
def strc(s_id):
	data={
    "columns": [
        "response_id",
        "added",
        "c2",
        "c6",
        "c10"
    ],
    "len": 5,
    "page": 0,
    "rows": [
        [
            "naa1K63BqNJ9d4JOJma",
            "0001-01-01 00:00:00",
            "Answer 2",
            "null",
            "null"
        ],
        [
            "Amm7OweBkaBgLDkw4dg",
            "0001-01-01 00:00:00",
            "Answer 222",
            "Answer 1111",
            "Answer 1111 ghjbkn"
        ],
        [
            "QKKkXXeppaWKOJ2eO8z",
            "0001-01-01 00:00:00",
            "null",
            "null",
            "Answer 1111 ghjbkn"
        ],
        [
            "epp164K4rOaJ9GNX8Vx",
            "2015-11-04 16:34:23.360000",
            "null",
            "null",
            "Answer 1111 1ghjbkn"
        ],
        [
            "BLLe7zKvkJj6GGQ43WO",
            "2015-11-04 17:52:58.664000",
            "null",
            " null",
            "Answer 1111 ghjbkn"
        ]
    ],
    "survey_id": "vOOWYJz55rVLbXr7zoq"
	}
	return jsonify(data)

@app.route("/api/survey/s:<s_id>/json")
def log(s_id):
	data={
	  "fields": [
	    {
	      "cid": "c2",
	      "field_options": [],
	      "field_type": "short_text",
	      "gametype": "text_scene",
	      "label": "What is your name?",
	      "next": {
	        "va": "c6"
	      },
	      "required": True
	    },
	    {
	      "cid": "c6",
	      "field_options": [
	        "Yes",
	        "No"
	      ],
	      "field_type": "yes_no",
	      "gametype": "car",
	      "label": "Have you gone on Facebook ever before?",
	      "next": {
	        "va": "c10"
	      },
	      "required": True
	    },
	    {
	      "cid": "c10",
	      "field_options": [
	        "Reading about friends",
	        "Chatting with friends",
	        "Finding new people",
	        "Reading (news, articles)",
	        "Shopping"
	      ],
	      "field_type": "multiple_choice",
	      "gametype": "balloon",
	      "label": "What do you primarily use Facebook for?",
	      "next": {
	        "va": "end"
	      },
	      "required": True
	    }
	  ],
	  "game_title": "Demo Survey",
	  "game_description": "Demo Description",
	  "game_footer": "Demo Footer",
	  "survey_id": "8NNaDvdGm3J1qwzDLbd"
		}
	return jsonify(data)