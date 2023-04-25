$(document).ready(function() {
    $("#tweet-text").on('input', function() {
        const text = $(this).val();
        const textCount = text.length;
        const textRemain = 140 - textCount;
        $('.counter').html(textRemain);
    });
  });