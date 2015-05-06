-module(home_page_handler).
-author("venkateshk@ybrantdigital.com").

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
 	Url = "http://api.contentapi.ws/videos?channel=world_news&limit=1&skip=0&format=long",
	% io:format("movies url: ~p~n",[Url]),
	{ok, "200", _, Response_mlb} = ibrowse:send_req(Url,[],get,[],[]),
	ResponseParams_mlb = jsx:decode(list_to_binary(Response_mlb)),	
	[Params] = proplists:get_value(<<"articles">>, ResponseParams_mlb),

	Political_Url = "http://api.contentapi.ws/news?channel=us_politics&limit=3&skip=0&format=short",
	{ok, "200", _, Response_Political} = ibrowse:send_req(Political_Url,[],get,[],[]),
	ResponseParams_Political = jsx:decode(list_to_binary(Response_Political)),	
	PoliticalParams = proplists:get_value(<<"articles">>, ResponseParams_Political),

	Worldnews_Url = "http://api.contentapi.ws/news?channel=us_world&limit=5&skip=0&format=short",
	{ok, "200", _, Response_Worldnews} = ibrowse:send_req(Worldnews_Url,[],get,[],[]),
	ResponseParams_Worldnews = jsx:decode(list_to_binary(Response_Worldnews)),	
	WorldnewsParams = proplists:get_value(<<"articles">>, ResponseParams_Worldnews),

	USmarkets_Url = "http://api.contentapi.ws/news?channel=us_markets&limit=5&skip=0&format=short",
	{ok, "200", _, Response_USmarkets} = ibrowse:send_req(USmarkets_Url,[],get,[],[]),
	ResponseParams_USmarkets = jsx:decode(list_to_binary(Response_USmarkets)),	
	USmarketsParams = proplists:get_value(<<"articles">>, ResponseParams_USmarkets),

	UStechnology_Url = "http://api.contentapi.ws/news?channel=us_technology&limit=5&skip=0&format=short",
	{ok, "200", _, Response_UStechnology} = ibrowse:send_req(UStechnology_Url,[],get,[],[]),
	ResponseParams_UStechnology = jsx:decode(list_to_binary(Response_UStechnology)),	
	UStechnologyParams = proplists:get_value(<<"articles">>, ResponseParams_UStechnology),

	USinternet_Url = "http://api.contentapi.ws/news?channel=us_internet&limit=5&skip=0&format=short",
	{ok, "200", _, Response_USinternet} = ibrowse:send_req(USinternet_Url,[],get,[],[]),
	ResponseParams_USinternet = jsx:decode(list_to_binary(Response_USinternet)),	
	USinternetParams = proplists:get_value(<<"articles">>, ResponseParams_USinternet),

	{ok, Body} = index_dtl:render([{<<"videoParam">>,Params},{<<"political">>,PoliticalParams},{<<"worldnews">>,WorldnewsParams},{<<"usmarkets">>,USmarketsParams},{<<"ustechnology">>,UStechnologyParams},{<<"usinternet">>,USinternetParams}]),
    {Body, Req, State}
.