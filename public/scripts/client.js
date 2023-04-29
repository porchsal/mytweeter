/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [];
$( document ).ready(function() {
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
              <span class="time-created">${timeago.format(tweetData.created_at)}</span>
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
      
    const renderTweets = function(tweets) {
      $('#tweets-container').empty();
      for (let tweet of tweets){
        const $tweet = createTweetElement(tweet);
        $('#tweets-container').append($tweet)
      }
    };
    
    //renderTweets(data);
    
    $(".tweet-target").submit(function (event) {
        event.preventDefault();
        const formTweet = $(this).serialize;
        $.post("/tweets/", formTweet, () => {
             $(this).find("#tweet-text").val("");
             $(this).find(".counter").val("");
           //renderTweets(formTweet);
            
        }

        )

    })


  const loadTweets = function(){
    $.get("/tweets/", function(newTweet) {
      renderTweets(newTweet.reverse());
    })
  }

  loadTweets();
});




  