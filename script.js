$(document).ready(function(){

    var query = "SELECT * FROM feed WHERE url='http://feeds.feedburner.com/Tutorialzine' LIMIT 2";

    // Storing the seconds since the epoch in now:
    var now = (new Date()).getTime()/1000;

    // If there is no cache set in localStorage, or the cache is older than 1 hour:
    if(!localStorage.cache || now - parseInt(localStorage.time) > 1*60*60)
    {
        $.get("https://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json&callback=?",function(msg){

            // msg.query.results.item is an array:
            var items = msg.query.results.item;
            var htmlString = "";

            for(var i=0;i<items.length;i++)
            {
                var tut = items[i];

                // Extracting the post ID from the permalink:
                var id = tut.guid.content.match(/(\d+)$/)[0];

                // Looping and generating the markup of the tutorials:

                htmlString += '<div class="tutorial">'+tut.description+'</div>';

                console.log(tut.description);
            }

            // Setting the cache
            localStorage.cache	= htmlString;
            localStorage.time	= now;

            // Updating the content div:
            $('#content').html(htmlString);
        },'json');
    }
    else{
        // The cache is fresh, use it:
        $('#content').html(localStorage.cache);
    }   
});

