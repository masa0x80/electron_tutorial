$(document).ready(function() {
  $.ajax({
    type:     'GET',
    url:      'https://twitter.com/masa0x80',
    success:  function(data) {
      $('#electron_container').html(data);
      $('a').css(
        {
          fontWeight: 'bold',
          color: '#333'
        }
      );
    }
  });
});
