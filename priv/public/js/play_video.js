$(document).ready(function() {
  // var vastURI = 'http://vast.optimatic.com/vast/getVast.aspx?id=p0ck37s1id35h0w&zone=vpaidtag&pageURL=[INSERT_PAGE_URL]&pageTitle=[INSERT_PAGE_TITLE]&cb=[CACHE_BUSTER]';
  // var vastURI = 'http://vpc.altitude-arena.com/vpc.xml?uid=dok6fccef906a545&page_url=[REPLACE]&cb=[REPLACE]&ref_page_url=[REPLACE]&player_width=[REPLACE]&player_height=[REPLACE]&video_duration=[REPLACE]&media_file_url=[REPLACE]&media_file_title=[REPLACE]&media_description=[REPLACE]&media_file_id=[REPLACE]';
  var video = "http://newscdn.lycos.com/world_news/"+$("#video_name").val();
  var media_url = "http://newscdn.lycos.com/world_news/";
  var media_title = $('#video_tit').val();
  var media_desc = $('#video_desc').val();
  var media_duration = $('#video_duration').val();    
  var vastURI = 'http://vpc.altitude-arena.com/vpc.xml?uid=dok6fccef906a545&page_url=[REPLACE]&cb=[REPLACE]&ref_page_url=[REPLACE]&player_width=100%&player_height=364&video_duration='+media_duration+'&media_file_url='+media_url+'&media_file_title='+media_title+'&media_description='+media_desc+'&media_file_id=myElement';
is_already_paused = false;
   jwplayer("myElement").setup({
    file: video,
    startparam: "start",
    autostart:true,
    primary: "flash",
   "width": 611,
   "height": 350,
   stretching: "exactfit",
   advertising: {
        client: "vast",
        tag: updateURL(vastURI)
        // tag: "http://vast.optimatic.com/vast/getVast.aspx?id=w984i078l984&zone=vpaidtag&pageURL=[INSERT_PAGE_URL]&pageTitle=[INSERT_PAGE_TITLE]&cb=[CACHE_BUSTER]"
      },
//    events:{
//     onPlay: function() {
//       jwplayer('container').start();
//     },
//     onTime: function(object) {
//       if(object.position >= 10 && !is_already_paused ) {
//         jwplayer().stop(true);
//         //this.pause();
//         is_already_paused = true;
//     }
    
      

//     }
// }
  });
// jwplayer('myElement').setup({
//       "flashplayer": "http://player.longtailvideo.com/player.swf",
//       "playlist": [
//         {
//           // "file": "http://video.contentapi.ws/{{videoParam.video}}"
//           "file": video
//         }
//       ],  
//       "width": 611,
//       "height": 350,
//       stretching: "exactfit",
//       autostart: true,
//       "controlbar": {
//         "position": "bottom"
//       },
//       "plugins": {
//         "ova-jw": {
//           "ads": {
//             "companions": {
//               "regions": [
//                 {
//                   "id": "companion",
//                   "width": 80,
//                   "height": 300
//                 }
//               ]
//             },
//             "schedule": [
//               {
//                 "position": "pre-roll",
//                 //"tag": "http://vast.optimatic.com/vast/getVast.aspx?id=s93akgl0y&zone=vpaidtag&pageURL=[INSERT_PAGE_URL]&pageTitle=[INSERT_PAGE_TITLE]&cb=[CACHE_BUSTER]"
//                 "tag": updateURL(vastURI)
//               }
//             ]
//           },
//           "debug": {
//             "levels": "none"
//           }
//         }
//       }
//     });
//   var t={
//           adWatched:false,
//         };
          
//           // jwplayer('myElement').onAdComplete(function(){
//           //   t.adWatched=true;
//           // });
          
//           jwplayer('myElement').onPlay(function(){
//             if(t.adWatched==false){
//                 jwplayer('myElement').stop(true);
//                 t.adWatched="none";
//               }
//             if(t.adWatched==true){
//                 jwplayer('myElement').stop(true);
//                 t.adWatched=false
//               }
//           });
          
            
//           jwplayer('myElement').onPlaylistItem(function(){
//             t.adWatched=false;
//           });
});


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
    else if(key == 'page_url'){
      var currentUrl = document.URL;
      //var currentUrl = "http://test.com";
      fragmentString = fragmentString + key + '=' + currentUrl + '&'; 
    }else if(key == 'ref_page_url'){
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