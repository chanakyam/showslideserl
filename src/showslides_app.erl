-module(showslides_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
	Dispatch = cowboy_router:compile([
		{'_',[
                {"/", home_page_handler, []},
		        {"/morenews", all_news_handler, []},
                {"/morevideos", all_videos_handler, []},
                {"/playvideo/:id", play_video_handler, []},
		        {"/api/news/count", news_count_handler, []},
                {"/api/slideshows/channel", channel_slideshow_handler, []},
                {"/api/videos/channel", channel_videos_handler, []},
		        {"/about", about_page_handler, []},
		        {"/contact", contact_page_handler, []},
                {"/termsandconditions", tnc_page_handler, []},
                {"/api/slideshows/:id", document_handler, []},
                {"/show/:id", single_slideshow_handler, []},

                %%Release routes  

                {"/css/[...]", cowboy_static, {priv_dir, showslides, "public/css"}},
                {"/images/[...]", cowboy_static, {priv_dir, showslides, "public/images"}},
                {"/js/[...]", cowboy_static, {priv_dir, showslides, "public/js"}},
                {"/fonts/[...]", cowboy_static, {priv_dir, showslides, "public/fonts"}}

                %%Dev routes

                % {"/css/[...]", cowboy_static, {dir, "priv/public/css"}},
                % {"/images/[...]", cowboy_static, {dir, "priv/public/images"}},
                % {"/js/[...]", cowboy_static, {dir,"priv/public/js"}},
                % {"/fonts/[...]", cowboy_static, {dir, "priv/public/fonts"}}

        ]}		
	]), 

	{ok, _} = cowboy:start_http(http,100, [{port, 9912}],[{env, [{dispatch, Dispatch}]},
                                                          {onrequest, fun request_hook_responder:set_cors/1},
                                                          {onresponse, fun error_hook_responder:respond/4}	

                                                          
              ]),
    showslides_sup:start_link().

stop(_State) ->
    ok.
