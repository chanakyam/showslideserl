-module(channel_slideshow_handler).
-author("shree@ybrantdigital.com").

-export([init/3]).

-export([content_types_provided/2]).
-export([welcome/2]).
-export([terminate/3]).

%% Init
init(_Transport, _Req, []) ->
	{upgrade, protocol, cowboy_rest}.

%% Callbacks
content_types_provided(Req, State) ->
	{[		
		{<<"text/html">>, welcome}	
	], Req, State}.

terminate(_Reason, _Req, _State) ->
	ok.

%% API
welcome(Req, State) ->
	{Category, _ } = cowboy_req:qs_val(<<"c">>, Req),
	{Limit, _ } = cowboy_req:qs_val(<<"l">>, Req),
	{Skip, _ } = cowboy_req:qs_val(<<"skip">>, Req),
	

	Url = case binary_to_list(Category) of 
		"us_political" ->
			%Category = "US",
			string:join(["http://api.contentapi.ws/news?channel=us_politics&limit=", binary_to_list(Limit),"&skip=", binary_to_list(Skip),"&format=short"],"");
		"us_world_news" ->
			%Category = "US",
			string:join(["http://api.contentapi.ws/news?channel=us_world&limit=", binary_to_list(Limit),"&skip=", binary_to_list(Skip),"&format=short"],"");			
		"us_markets" ->
			%Category = "Politics",
			string:join(["http://api.contentapi.ws/news?channel=us_markets&limit=", binary_to_list(Limit),"&skip=", binary_to_list(Skip),"&format=short"],"");
		"us_technology" ->
			%Category = "Politics",
			string:join(["http://api.contentapi.ws/news?channel=us_technology&limit=", binary_to_list(Limit),"&skip=", binary_to_list(Skip),"&format=short"],"");	
		"us_internet" ->
			%Category = "Politics",
			string:join(["http://api.contentapi.ws/news?channel=us_internet&limit=", binary_to_list(Limit),"&skip=", binary_to_list(Skip),"&format=short"],"");
		_ ->
			%Category = "None",
			lager:info("#########################None")

	end,
	% io:format("url--> ~p ~n",[Url]),

	{ok, "200", _, Response_mlb} = ibrowse:send_req(Url,[],get,[],[]),
	Body = list_to_binary(Response_mlb),
	{Body, Req, State}.

