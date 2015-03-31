/*
  As of right now this game is intended for your own enjoyment.
  If you want to tweak the settings, feel free.
*/

var points, lives, prev_co, prev_co_link;
var high_score = 0;
var language = null;

if (localStorage.guessTheStack) {
  high_score = (Number(localStorage.guessTheStack) || 0);
}

var populate_fields_with_new_service = function() {
  $.getJSON("//stackshare.io/api/v1/stacks/random", function(data){
    $("a.c_name").attr("href", data["web_url"]);
    $("a.c_name").html(data["name"]);
    $("a.c_web").attr("href", data["web_url"]);
    $("a.c_web").html(data["web_url"]);
    prev_co = data["name"];
    prev_co_link = data["url"];

    var description = data["description"];
    if (description == "") {
      description = "No description available";
    };
    $(".c_desc").html(description);
    $("img.c_img").attr("src", data["logo"]);
    language = data["languages"];

    var database = (data["databases"] || "");
    if (database == "") {
      database = "Not listed";
      $(".c_db").hide();
    } else {
      $(".c_db").show();
      $(".c_db").html(database);
    }

  });
};

var refresh_stats = function() {
  $(".points").html(points);
  $(".lives").html(lives);
  $(".high_score").html(high_score);
  $(".prev_co").html(prev_co);
  $(".prev_co").attr("href", prev_co_link);
}

var starting_conditions = function(){
  points = 0;
  lives = 3;
  prev_co = "last company";
  $(".correct_answer").html("N/A");
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

  refresh_stats();
}

$(function(){
  starting_conditions();
  refresh_stats();
  populate_fields_with_new_service();

  $(".c_btn").click(function(e){
    var selected = $(this).data("language");
    if (language === selected) {
      points = points + 1;
    } else {
      lives = lives - 1;
    }
    $(".correct_answer").html(language);
    check_game_status();
    populate_fields_with_new_service();
    e.preventDefault();
  });

  $('img').on('error', function() {
    $(this).attr('src', 'http://placehold.it/200x200');
  });
});