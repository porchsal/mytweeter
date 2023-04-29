/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [];
$( document ).ready(function() {


  $("#error-message-empty").hide();
  $("#error-message-long").hide();


  //escape function to secure page and avoid injection
  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }




  //  creates tweet element and uses escape function
  const createTweetElement = function(tweetData) {
    const $tweet = `
        <article class="tweet">
            <header class="tweet-header">
              <span> <img class="avatar" src=${tweetData.user.avatars} alt="profile-picture"/> ${tweetData.user.name} </span>
              <h3>${tweetData.user.handle}</h3>
            </header>
            <section class="tweet-body">
              <p>${escape(tweetData.content.text)}</p>
            </section>
            <footer class="tweet-footer-container">
              <p class="time-created">${timeago.format(tweetData.created_at)}</p>
                <div class="icons">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>
            </footer>
          </article>
        `
     return $tweet;
  };

//renderTweets(data);  
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets){
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet)
    }
  };

// request to load tweets to #tweets-container 
  const loadTweets = function(){
    $.get("/tweets/", function(newTweet) {
      renderTweets(newTweet.reverse());
    })
  } 
//  add new tweet when submit    
    $("#tweet-target").on("submit", function (event) {
      event.preventDefault();
      const maxChar = 140;
      const inputCounter = $(this).find(".counter").val(); 
      const inputText =  $(this).find("#tweet-text").val();
      $("#error-message-empty").slideUp("slow");
      $("#error-message-tooLong").slideUp("slow");
      if( !inputText ){
        $("#error-message-empty").slideDown("slow");
        $("#error-message-long").hide();
      } else if (inputCounter < 0) {
        $("#error-message-empty").hide();
        $("#error-message-long").slideDown("slow");
      } else {
        const formTweet = $(this).serialize();
        $.ajax({
          url: "/tweets/",
          method: 'POST',
          data: formTweet,
          success: function(){
            // $(this).find("#tweet-text").val();
            // $(this).find(".counter").val();
            //inputText;
            //inputCounter;
            $("#tweet-text").val("");
            $(".counter").val(maxChar);
            loadTweets();
          }

        })
           
      }
      
    
    });


  loadTweets();
});




  