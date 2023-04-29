/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [];
$( document ).ready(function() {

//  creates tweet element
  const createTweetElement = function(tweetData) {
    const $tweet = `
        <article class="tweet">
            <header class="tweet-header">
              <span> <img class="avatar" src=${tweetData.user.avatars} alt="profile-picture"/> ${tweetData.user.name} </span>
              <h3>${tweetData.user.handle}</h3>
            </header>
            <section class="tweet-body">
              <p>${tweetData.content.text}</p>
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
      
      if( !inputText ){
        alert("Tweet empty");
      } else if (inputCounter < 0) {
        alert("Tweet too long, 140 characters max");
      } else {
        const formTweet = $(this).serialize();
        $.ajax({
          url: "/tweets/",
          method: 'POST',
          data: formTweet,
          success: function(){
            // $(this).find("#tweet-text").val();
            // $(this).find(".counter").val();
            inputText;
            inputCounter;
            loadTweets();
          }

        })
           
      }
      
    
    });


  loadTweets();
});




  