var webView = document.getElementById('mainWebView');

webView.addEventListener('did-finish-load', function() {
  this.insertCSS('body {color: green !important}');
  this.insertCSS('a:visited {color: blue !important}');
  this.executeJavaScript(
    (function(){
      $('.ProfileAvatar-image').css('border', 'green 5px solid');
      $('a').css(
        {
          fontWeight: 'bold',
          color: '#333'
        }
      );
    }).
    toString().replace(/function\s*\(\)\{/, "").
    replace(/}$/,"").trim()
  );
});
