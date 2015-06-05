/*
  As of right now this game is intended for your own enjoyment.
  Hopefully this will help you to match names and faces.
  If you want to tweak the settings, feel free.
*/

var points, lives, prev_co, prev_co_link, prev_web_url;
var high_score = 0;
var language = null;

var api_end_point = "/random.json";
var correct_answer_id = null;
var max_lives = 3;

/*
  JSON schema for the endpoint
*/

/*
  {
    "description": "Business Design Intern",
    "thumbnail": "http://placekitten.com/g/200/300",
    "web_url": "http://tube.ideo.com/people/cstoller",
    "options": [
      "Cyrus Stoller",
      "Nancy Drew",
      "Jim Kirk",
      "Spock"
    ],
    "correct_answer_id": 0
  }
*/


if (localStorage.guessTheStack) {
  high_score = (Number(localStorage.guessTheStack) || 0);
}

var populate_fields_with_new_service = function() {
  $.getJSON(api_end_point, function(data){
    prev_web_url = data["web_url"];
    prev_co_link = data["url"];

    var description = data["description"];
    if (description == "") {
      description = "No description available";
    };
    $(".c_desc").html(description);
    $("img.c_img").attr("src", data["thumbnail"]);

    correct_answer_id = data["correct_answer_id"];
    console.log("set: correct_answer_id "+ correct_answer_id)

    $(".option_0").html(data["options"][0])
    $(".option_1").html(data["options"][1])
    $(".option_2").html(data["options"][2])
    $(".option_3").html(data["options"][3])

    prev_co = data["options"][correct_answer_id];
  });
};

var refresh_stats = function() {
  $(".points").html(points);
  $(".lives").html(lives);
  $(".high_score").html(high_score);
  $(".prev_co.name").html(prev_co);
  $(".prev_co.name").attr("href", prev_web_url);
}

var starting_conditions = function(){
  points = 0;
  lives = max_lives;
  prev_co = "N/A";
  prev_web_url = "";
}

var check_game_status = function() {
  if (points > high_score) {
    high_score = points;
    localStorage.guessTheStack = high_score;
  }

  if (lives < 0) {
    alert("Game Over. You scored " + points + " points. Your high score is " + high_score + " points.");
    starting_conditions();
  }
  placeholder_img();

  refresh_stats();
}

var placeholder_img = function(){
  $(this).attr('src', 'http://placehold.it/200x200');
}

$(function(){
  starting_conditions();
  refresh_stats();
  populate_fields_with_new_service();

  $(".c_btn").click(function(e){
    var selected = $(this).data("language");

    if (correct_answer_id === selected) {
      points = points + 1;
    } else {
      lives = lives - 1;
    }
    $(".correct_answer").html(language);
    check_game_status();
    populate_fields_with_new_service();
    e.preventDefault();
  });

  $('img').on('error', placeholder_img);
});