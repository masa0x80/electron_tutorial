var webView = document.getElementById('mainWebView');

webView.addEventListener('did-finish-load', function() {
  this.insertCSS('body {color: green !important}');
  this.insertCSS('a:visited {color: blue !important}');
  this.executeJavaScript(
    (function(){
      $(window).keydown(function(event) {
        if (event.ctrlKey) {
          if (event.keyCode === 82) { // R
            location.reload();
            return false;
          }
        }
      });

      $('.ProfileAvatar-image').css('border', 'green 5px solid');
      $('a').css(
        {
          fontWeight: 'bold',
          color: '#333'
        }
      );
      $('a.js-user-profile-link').click(function() {
        window.open($(this).attr('href'));
        return false;
      });
    }).
    toString().
    replace(/function\s*\(\)\{/, "").
    replace(/}$/,"").
    trim()
  );
});

const shell = require('shell');
webView.addEventListener('new-window', function(event) {
  if (event.disposition === 'new-window') {
    shell.openExternal(event.url);
  } else {
    this.loadURL(event.url);
  }
});
