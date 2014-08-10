// $(function (){

  function submit_new_city() {
    console.log("submitted");
      var user_input = $("#new-city").val();
    // $("#new-city").submit(function(e) {
      // e.preventDefault();
      console.log("submitted via ajax: " + user_input);

      function city_results(json) {
        console.log("city results wooo");
      }

      $.ajax({
        type: "GET",
        jsonpCallback: "city_results",
        url: "http://autocomplete.wunderground.com/aq?cb=city_results&query=" + user_input,
        dataType: 'jsonp',
        success: function(response) {
          if (typeof response.RESULTS == 'undefined'){
            $("#invalid-city").prepend("Not a valid city");
          };
          var first_result = response.RESULTS[0].name;
          console.log(response);
          console.log(response.RESULTS);
          console.log("new city form success: " + first_result);
          
          $("#new-city").val("");
          console.log("finished");
        },
        error: function(response) {
          // var first_result = response['results'][0]['name']
          console.log("new city form failure: " + response);
          $("#invalid-city").prepend("Not a valid city");
          $("#new-city").val("");
          console.log("finished");
        }
      });

      return false;

    // });

  }

// });