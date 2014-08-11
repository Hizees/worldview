function tweets(location) {

        var search_term = location.name.replace(/ /g,"");
   
        $('.twitter-header').show();
        $('#twitter').empty();
        
        var URL = "/twitter?location=" + search_term;

        $.ajax({
            url: URL,
            type: "GET",
            data: {},
            dataType: "json",
            success: function(response) {
                console.log("twitter response: "+response);
                for (var i = 0; i < 10; i++) {
                    // console.log(response);
                    var tweet = response[i].text;

                    // render hashtags as links
                    for (var j = 0; j < response[i].entities.hashtags.length; j++) {
                        var hash = response[i].entities.hashtags[j].text;
                        tweet = tweet.replace("#" + hash, "<a href=\"http://twitter.com/search?q=%23" + hash + "\" target=\"_blank\">" + "#" + hash + "</a>");
                    }

                    // render handles as links
                    for (var j = 0; j < response[i].entities.user_mentions.length; j++) {
                        var mentions = response[i].entities.user_mentions[j].screen_name;
                        tweet = tweet.replace("@" + mentions, "<a href=\"http://twitter.com/search?q=%40" + mentions + "\" target=\"_blank\">" + "@" + mentions + "</a>");
                    }

                    // render urls as clickable links
                    for (var j = 0; j < response[i].entities.urls.length; j++) {
                        var url = response[i].entities.urls[j].url;
                        tweet = tweet.replace(url, "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>");
                    }

                    // render media urls as clickanle links
                    if (response[i].entities.media !== undefined) {
                        for (var j = 0; j < response[i].entities.media.length; j++) {
                            var url = response[i].entities.media[j].url;
                            tweet = tweet.replace(url, "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>");
                        }
                    }

                    $('#twitter').append("<li><h3>" + tweet + "</h3><button class='save-tweet'>Like</button></li>");
                    
                    if (loggedIn == true){
                        console.log("Show tweet like button.")
                        $('.save-tweet').show();            
                      } else {
                        console.log("Hide tweet like button.")
                        $('.save-tweet').hide();
                      }


                }
            },
            error: function (response) {
                console.log("error");
                // console.log(response);
            }

        });
    
}
$(function () {
    $('.twitter-header').hide();
    $("#twitter").on("click", ".save-tweet", function (event) {
        event.preventDefault();

        var individual_tweet = $(this).closest('li').find('h3').html();

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/tweets",
            data: {
                tweet: {
                    data: individual_tweet
                }
            },
            success: function (response) {
                console.log("Saving tweet successful.");
                $that.text("Saved in dashboard!");

            },
            error: function (response) {
                console.log("Saving tweet failed.");
            }
        });
    });
});



