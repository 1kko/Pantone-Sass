// main.js
$.cssHooks.backgroundColor = {
  get: function(elem) {
    if (elem.currentStyle)
      var bg = elem.currentStyle["backgroundColor"];
    else if (window.getComputedStyle)
      var bg = document.defaultView.getComputedStyle(elem,null).getPropertyValue("background-color");
    if (bg.search("rgb") == -1)
      return bg;
    else {
      bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
  }
}

$(document).ready(function() {
  var client = new ZeroClipboard( $(".box"), {
    moviePath: "//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.swf",
    debug: false
  } );

  client.on( "ready", function( readyEvent ) {
    client.on( "copy", function( event ) {
      var color=$(event.target).css('background-color');
      ZeroClipboard.setData("text/plain",color);
      $(event.target).fadeTo(100,0.1).fadeTo(200,1.0);
      // console.debug(color);
    } );
  } );
});
