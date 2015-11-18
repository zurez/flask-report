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
@app.route("/api/survey/<s_id>/response/aggregate")
def strc(s_id):
	data={
	"page": 0,
	 "columns": [
	 	"response_id", 
	 	"added", 
	 	"c2",
	 	"c6",
	 	"c10",
	 	"c15",
	 	"c19",
	 	"c23"],
	 	"survey_id": "MAAqlmKLz4ABxzJqAeM",
	 	"rows": [
	 	[
	 	"zddzb2vMjrDN4Y4vawG",
	 	"2015-11-11 11:48:08.890000",
	 	"Madhulika Mukherjee",
	 	"a_2","null", "null", "null", "null"], ["eppn3AjqrAK441JLObq", "2015-11-11 17:55:29.451000", "djhbekdjns,m xz", "a_2", "null", "null", "null", "null"], ["2WWLzLWy1Ko25D8LBe3", "2015-11-11 18:02:00.284000", "fdsjbcnzxmewdasZ", "a_2", "a_3", "null", "null", "null"], ["goompBlr1zDkrYgZgMb", "2015-11-11 18:52:28.306000", "Tested And Fixed", "a_2", "a_2", "null", "null", "null"], ["jggVBXv1Gb9ppzKpeAl", "2015-11-11 19:03:37.393000", "Final test. PS - 7 PM", "a_1", "a_1", "null", "null", "null"], ["l55maqlDj4zXLo5k89x", "2015-11-11 21:21:05.109000", "jkahsdolewf", "a_1", "a_1###a_3", "null", "null", "null"], ["DggwJajemY3ba7av9L5", "2015-11-12 12:05:45.889000", "eojfowejfowjog", "a_2", "a_1###a_2###a_4", "null", "null", "null"], ["YzzGDxlrlxY8Ny34Yxv", "2015-11-12 12:06:38.620000", "Vivek Jha.", "a_1", "a_1###a_2", "null", "null", "null"], ["yZZzMa6ny1l9omA2aba", "2015-11-12 13:43:42.962000", "Unity 3D with c#", "a_1", "a_2###a_4", "null", "null", "null"], ["aZZGBK91d3g2x1vGZKX", "2015-11-12 17:40:59.681000", "dcsvfvgfdzsfsz", "a_2", "a_2###a_4", "null", "null", "null"], ["wrrzvbdYQld8WnaJev5", "2015-11-12 19:45:20.500000", "null", "null", "null", "null", "null", "null"], ["YzzGZepj4An7b1m15VZ", "2015-11-12 21:42:02.581000", "hello", "a_1", "a_2", "null", "null", "null"], ["LKKpb2kJxdAmjr8nW26", "2015-11-13 01:38:59.730000", "NO!", "a_2", "a_1", "null", "null", "null"]], "questions": [["c2", "Is your name Madhulika??"], ["c6", "Have you gone on Facebook ever before?"], ["c10", "What do you primarily use Facebook for?"], ["c15", "Question Title\u001e"], ["c19", "Question Title\u001e"], ["c23", "Question Title\u001e"]], "len": 13}

	return jsonify(data)
@app.route("/api/survey/<s_id>/json")
def log(s_id):
	data={"game_description": "Default Description", "game_title": "Sample Survey", "fields": [{"label": "Is your name Madhulika??", "required": True, "q_no": 1, "field_options": [], "richtext": False, "gametype": "text_scene", "field_type": "short_text", "next": {"va": "c6"}, "cid": "c2"}, {"required": True, "notifications": True, "next": {"va": "c10"}, "gametype": "car", "label": "Have you gone on Facebook ever before?", "q_no": 2, "field_options": ["Yes", "No"], "richtext": True, "field_type": "yes_no", "cid": "c6"}, {"label": "What do you primarily use Facebook for?", "required": True, "q_no": 3, "field_options": ["Reading about friends", "Chatting with friends", "Finding new people", "Reading (news, articles)", "Shopping"], "gametype": "balloon", "field_type": "multiple_choice", "next": {"va": "c15"}, "cid": "c10"}, {"required": True, "notifications": False, "next": {"va": "c19"}, "gametype": "fish_scene_two", "label": "Question Title\u001e", "q_no": 4, "field_options": ["Option\u001e", "Option\u001e"], "richtext": False, "field_type": "multiple_choice", "cid": "c15"}, {"label": "Question Title\u001e", "required": True, "q_no": 5, "field_options": ["Option\u001e", "Option\u001e"], "gametype": "stairs", "field_type": "ranking", "next": {"va": "c23"}, "cid": "c19"}, {"label": "Question Title\u001e", "required": True, "q_no": 6, "field_options": [], "gametype": "scroll_scene", "field_type": "rating", "next": {"va": "end"}, "cid": "c23"}], "game_footer": "Thanks for your amazing response."}
	return jsonify(data)
@app.route("/embed")
def embed():
	return render_template("embed.html")
@app.route("/new")
def new ():
	return render_template("new.html")