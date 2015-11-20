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
	data={"columns": ["response_id", "added", "c2", "ee1f6c8f-a6b8-4b7c-83b7-26082954b6de", "50b49ce5-7e5b-407e-aa43-0280e7b3b066", "45bdecd0-66e2-4894-af4f-d917c2731f18", "faa4e967-8045-4fd6-b68c-0165635f8df1", "b9942d5a-8a28-4266-8dc0-79e9ccc997df", "1ea7ba0c-60b5-4bc4-995b-b5dd68e6348c"], "survey_id": "gooKAmG21JaK3vajGbb", "questions": [["c2", "Identify yourself!"], ["ee1f6c8f-a6b8-4b7c-83b7-26082954b6de", "Write a 10 digit number"], ["50b49ce5-7e5b-407e-aa43-0280e7b3b066", "Write 20 random words"], ["45bdecd0-66e2-4894-af4f-d917c2731f18", "Are you a Liar?"], ["faa4e967-8045-4fd6-b68c-0165635f8df1", "If you had to chose one thing"], ["b9942d5a-8a28-4266-8dc0-79e9ccc997df", "Select as many colors as you like."], ["1ea7ba0c-60b5-4bc4-995b-b5dd68e6348c", "Rate Shahi-Paneer"]], "rows": [["4zzmzlxDdMb4N33Mv5N", "2015-11-20 02:30:18.912000", "mm", ",,,", "mmm", "a_2", "a_4", "a_1###a_2###a_3", "6"], ["DggOg99YNYzqgBKvgam", "2015-11-20 02:33:26.198000", "fgfgfgfgfg", "67676767676", "rtrtrtrtrtrt", "a_1", "a_1", "a_1###a_2###a_3###a_4", "7"], ["q113l6r4679dLDk3rqN", "2015-11-19 23:01:19.115000", "Robot", "123445677&&&&", "Good Bad Lovely Sad", "a_2", "a_4", "a_1###a_2###a_3###a_4", "9"], ["gooKmYV2ML42NQDwLgA", "2015-11-20 16:19:56.694000", "Bazooka", "1234567890", "cool bad happy lol", "a_2", "a_1", "a_1###a_4", "1"], ["q113mw9y7XLX8owq5lo", "2015-11-20 16:28:20.325000", "HONEY SINGH", "9013929292", "LOL WHAT THE HELL", "a_1", "a_4", "a_2###a_3", "10"]], "page": 0, "len": 5}
	return jsonify(data)
@app.route("/api/survey/<s_id>/json")
def log(s_id):
	data={"game_description": "An experience so long", "game_title": "A life so short", "game_footer": "An ending so mysterious. A goodbye so traumatic.", "fields": [{"required": "true", "next": {"va": "ee1f6c8f-a6b8-4b7c-83b7-26082954b6de"}, "field_options": [], "field_type": "short_text", "label": "Identify yourself!", "gametype": "text_scene", "cid": "c2"}, {"required": "true", "q_no": 2, "next": {"va": "50b49ce5-7e5b-407e-aa43-0280e7b3b066"}, "field_options": [], "field_type": "short_text", "label": "Write a 10 digit number", "gametype": "text_scene", "cid": "ee1f6c8f-a6b8-4b7c-83b7-26082954b6de"}, {"required": "true", "q_no": 2, "next": {"va": "45bdecd0-66e2-4894-af4f-d917c2731f18"}, "field_options": [], "field_type": "long_text", "label": "Write 20 random words", "gametype": "suggestions", "cid": "50b49ce5-7e5b-407e-aa43-0280e7b3b066"}, {"required": "true", "q_no": 2, "next": {"va": "faa4e967-8045-4fd6-b68c-0165635f8df1"}, "field_options": ["Yes", "No"], "field_type": "yes_no", "label": "Are you a Liar?", "gametype": "car", "cid": "45bdecd0-66e2-4894-af4f-d917c2731f18"}, {"required": "true", "q_no": 2, "next": {"va": "b9942d5a-8a28-4266-8dc0-79e9ccc997df"}, "field_options": ["A visit to Bangkok", "Thousand Dollars", "Iphone6", "Unlimited food at BBQ"], "field_type": "single_choice", "label": "If you had to chose one thing", "gametype": "bird_tunnel", "cid": "faa4e967-8045-4fd6-b68c-0165635f8df1"}, {"required": "true", "q_no": 2, "next": {"va": "1ea7ba0c-60b5-4bc4-995b-b5dd68e6348c"}, "field_options": ["Green", "Blue", "Red", "Yellow"], "field_type": "multiple_choice", "label": "Select as many colors as you like.", "gametype": "fish_scene_two", "cid": "b9942d5a-8a28-4266-8dc0-79e9ccc997df"}, {"required": "true", "q_no": 2, "next": {"va": "end"}, "field_options": [], "field_type": "rating", "label": "Rate Shahi-Paneer", "gametype": "scroll_scene", "cid": "1ea7ba0c-60b5-4bc4-995b-b5dd68e6348c"}]}
	return jsonify(data)
@app.route("/embed")
def embed():
	return render_template("embed.html")
@app.route("/new")
def new ():
	return render_template("new.html")