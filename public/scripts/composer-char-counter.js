$(document).ready(function() {
    $("#tweet-text").on('input', function() {
        const text = $(this).val();
        const textCount = text.length;
        const textRemain = 140 - textCount;
        
        if (textRemain < 0) {
            $('.counter').html(textRemain).css('color', 'red');
        } else {
            $('.counter').html(textRemain).css('color', 'black');
        }
    });
  });