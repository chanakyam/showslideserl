var app = angular.module('showSlides', ['ui.bootstrap']);

app.factory('showSlidesHomePageService', function ($http) {
	return {
		
		// getDoc: function(docId) {
		// 	return $http.get('/api/slideshows/'+ docId).then(function (result) {
		// 		return result.data.view_image;
		// 	});
		// },

		getChannelPictures: function (category, count, skip) {
			return $http.get('/api/slideshows/channel?c=' + category + '&l=' + count + '&skip=' + skip).then(function (result) {
				return result.data.articles;
			});
		},
    getChannelVideos: function (count, skip) {
      return $http.get('/api/videos/channel?l=' + count + '&skip=' + skip).then(function (result) {
        return result.data.articles;
      });
    }
	};
});
app.controller('ShowSlidesHome', function ($scope, showSlidesHomePageService) {
	//the clean and simple way
  $scope.currentYear = (new Date).getFullYear();
	$scope.topUsPolitical = showSlidesHomePageService.getChannelPictures('us_political',3,0);
	$scope.topWorldNews = showSlidesHomePageService.getChannelPictures('us_world_news',3,0);
	$scope.topUsMarkets = showSlidesHomePageService.getChannelPictures('us_markets',3,0);
	$scope.topTechnology = showSlidesHomePageService.getChannelPictures('us_technology',3,0);
	$scope.topInternet = showSlidesHomePageService.getChannelPictures('us_internet',3,0);
  $scope.topWorldVideos = showSlidesHomePageService.getChannelVideos(3,0);
	
	
	
	//for video
	var video = "http://video.contentapi.ws/"+$("#video_name").val();
	$(document).ready(function() {    
                  var vastURI = 'http://vast.optimatic.com/vast/getVast.aspx?id=p0ck37s1id35h0w&zone=vpaidtag&pageURL=[INSERT_PAGE_URL]&pageTitle=[INSERT_PAGE_TITLE]&cb=[CACHE_BUSTER]';
                  function updateURL(vastURI){
                  // Generate a huge random number
                  var ord=Math.random(), protocol, host, port, path, pageUrl, updatedURI;
                  var parsedFragments = parseUri(vastURI);
                  ord = ord * 10000000000000000000;
                  // Protocol of VAST URI
                  protocol = parsedFragments.protocol;
                  // VAST URI hostname
                  host = parsedFragments.host;
                  // VAST URI Path
                  path = parsedFragments.path;
                  //VAST Page Url
                  pageUrl = parsedFragments.queryKey.pageUrl
                  var fragmentString ='';
                  //Updated URI
                  for(var key in parsedFragments.queryKey){//console.log("abhii");console.log();
                    // For Cache buster add a large random number
                    if(key == 'cb'){
                      fragmentString = fragmentString + key + '=' + ord + '&';  
                    }
                    // for referring Page URL, get the current document URL and encode the URI
                    else if(key == 'pageURL'){
                      var currentUrl = document.URL;
                      //var currentUrl = "http://test.com";
                      fragmentString = fragmentString + key + '=' + currentUrl + '&'; 
                    }else if(key == 'pageTitle'){
                      //var currentTit = document.title;
                      //var currentUrl = "http://test.com";
                      var page_title=document.title;
                      fragmentString = fragmentString + key + '=' + page_title + '&'; 
                    }
                    else{
                      fragmentString = fragmentString + key + '=' + parsedFragments.queryKey[key] + '&';
                    }
                    
                  }

                  updatedURI = protocol + '://' + host + path + '?' + fragmentString ;
                  
                  // Remove the trailing & and return the updated URL
                  return updatedURI.slice(0,-1);
                  //return encodeURI(updatedURI.slice(0,-1)); 

                  }

                  // Parse URI to get qeury string like cb for cache buster and pageurl
                function parseUri (str) {
                  var o   = parseUri.options,
                    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                    uri = {},
                    i   = 14;

                  while (i--) uri[o.key[i]] = m[i] || "";

                  uri[o.q.name] = {};
                  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
                    if ($1) uri[o.q.name][$1] = $2;
                  });

                  return uri;
                };

                parseUri.options = {
                  strictMode: false,
                  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
                  q:   {
                    name:   "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                  },
                  parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                  }
                };
                // end of code for generating cb,pagetit,pageurl
              jwplayer('myElement').setup({
                "flashplayer": "http://player.longtailvideo.com/player.swf",
                "playlist": [
                  {
                    // "file": "http://video.contentapi.ws/{{videoParam.video}}"
                    "file": video
                  }
                ],  
                "width": 611,
                "height": 350,
                stretching: "exactfit",
                autostart: true,
                "controlbar": {
                  "position": "bottom"
                },
                "plugins": {
                  "ova-jw": {
                    "ads": {
                      "companions": {
                        "regions": [
                          {
                            "id": "companion",
                            "width": 80,
                            "height": 300
                          }
                        ]
                      },
                      "schedule": [
                        {
                          "position": "pre-roll",
                          //"tag": "http://vast.optimatic.com/vast/getVast.aspx?id=s93akgl0y&zone=vpaidtag&pageURL=[INSERT_PAGE_URL]&pageTitle=[INSERT_PAGE_TITLE]&cb=[CACHE_BUSTER]"
                          "tag": updateURL(vastURI)
                        }
                      ]
                    },
                    "debug": {
                      "levels": "none"
                    }
                  }
                }
              });
            });


});



