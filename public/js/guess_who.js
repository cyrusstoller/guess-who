/*
  As of right now this game is intended for your own enjoyment.
  Hopefully this will help you to match names and faces.
  If you want to tweak the settings, feel free.
*/

var points, lives, prev_co, prev_co_link, prev_web_url, prev_thumb;
var high_score = 0;
var language = null;

// setting this dynamically now
// var api_end_point = "/random.json";
var correct_answer_id = null, prev_correct;
var max_lives = 3;

// adding hard mode
var mode = 'normal';

/*
  JSON schema for the endpoint
*/

/*
  {
    "description": "Business Design Intern",
    "original_thumbnail": "http://placekitten.com/g/200/300",
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


if (localStorage.guessWho) {
  high_score = (Number(localStorage.guessWho) || 0);
}

var populate_fields_with_new_service = function() {
  $.getJSON(api_end_point, function(data){
    prev_web_url = data["web_url"];
    prev_co_link = data["url"];

    if (use_original_thumbnail) {
      prev_thumb = data["original_thumbnail"];
    } else {
      prev_thumb = data["thumbnail"];
    }

    var description = data["description"];
    if (description == "") {
      description = "No description available";
    };
    $(".c_desc").html(description);
    $("img.c_img").attr("src", prev_thumb);

    if(mode == "normal") {
      correct_answer_id = data["correct_answer_id"];
      // console.log("set: correct_answer_id "+ correct_answer_id)

      $(".option_0").html(data["options"][0]);
      $(".option_1").html(data["options"][1]);
      $(".option_2").html(data["options"][2]);
      $(".option_3").html(data["options"][3]);
    } else {
      correct_answer_id = 0;
      $(".option_0").html("I know this");
      $(".option_1").html("I know part of it");
      $(".option_2").html("I could pick it out");
      $(".option_3").html("No idea");
    }

    prev_co = data["options"][data["correct_answer_id"]];
  });
};

var remove_glow = function() {
  $(".prev_thumb").removeClass("glow-red").removeClass("glow-green");
}

var set_prev_thumb = function() {
  $(".prev_thumb").attr("src", prev_thumb);
  remove_glow();
  if (prev_correct) {
    $(".prev_thumb").addClass("glow-green")
  } else {
    $(".prev_thumb").addClass("glow-red")
  }

  prev_correct = false;
}

var refresh_stats = function() {
  $(".points").html(points);
  $(".lives").html(lives);
  $(".high_score").html(high_score);
  $(".prev_co.name").html(prev_co);
  $(".prev_co.name").attr("href", prev_web_url);
  set_prev_thumb();
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
    localStorage.guessWho = high_score;
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

var clear_mode = function(){
  $(".mode").removeClass("normal").removeClass("hard");
}

var set_mode = function(new_mode){
  mode = new_mode; // set global state
  clear_mode();

  if (mode == "hard") {
    $(".mode").addClass("normal").html("Switch to normal mode");
  } else {
    $(".mode").addClass("hard").html("Switch to hard mode");
  }

  refresh_stats();
  populate_fields_with_new_service();
}

$(function(){
  starting_conditions();
  refresh_stats();
  remove_glow();
  populate_fields_with_new_service();

  $(".c_btn").click(function(e){
    var selected = $(this).data("language");
    prev_correct = (correct_answer_id === selected);

    if (prev_correct) {
      points = points + 1;
    } else {
      lives = lives - 1;
    }
    check_game_status();
    populate_fields_with_new_service();
    e.preventDefault();
  });

  $(".skip").click(function(e){
    refresh_stats();
    populate_fields_with_new_service();
    e.preventDefault();
  })

  // Set modes
  $(".mode").click(function(e){
    if($(this).hasClass("hard")){
      set_mode("hard");
    } else {
      set_mode("normal");
    }
    e.preventDefault();
  })

  $('img').on('error', placeholder_img);
});