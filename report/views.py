from report import app
from flask import render_template,jsonify
from flask import make_response,request,current_app
import requests
import json
from flask.ext.triangle import Triangle
from functools import wraps
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
@app.route("/report")
def show_console(userid="12"):
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
	
@app.route("/test")
def test():
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
@app.route("/api")
# @support_jsonp
def random_data():
	import random
	import json
	types=["pie","bar"]
	toss= random.randint(0,1)

	if toss==0:
		data =[
		{
		"typ":"pie",
		"labels":["A","B","C"],
		"values":[random.randint(200,1200),random.randint(200,1200),random.randint(200,1200)]
		}
		]
		return jsonify(data =data)
		
	elif toss==1:
		data=[
		{"typ":"bar",
		"labels":["A","B","C"],
		"values":[random.randint(20,100),random.randint(20,100),random.randint(20,100)]
		}
		]
		return jsonify(data =data)
	

	# return jsonify(data =data)