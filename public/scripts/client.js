/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]



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
                <p class="time-created">${tweetData.created_at}</p>
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
      
      
      renderTweets(data);
});




  