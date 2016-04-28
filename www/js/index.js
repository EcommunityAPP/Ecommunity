//Allows me to delay css changes.
$.fn.extend({
  qcss: function(css) {
    return $(this).queue(function(next) {
      $(this).css(css);
      next();
    });
  }
});

$("#box-1").click(function() {
  if (!$("#box-1").hasClass("open")) {
    $(".flex-item").fadeOut();
    $("#box-1").addClass("open").css({
      "position": "absolute",
      "z-index": "500",
      "width": "100vw",
      "height": "100vh"
    });
  } else {
    $(".flex-item").fadeIn();
    $("#box-1").removeClass("open").css({
      "width": "50vw",
      "height": "50vh"
    });
    $("#box-1").delay(1000).qcss({
      "position": "initial",
      "z-index": "initial"
    });
  }
});

$("#box-2").click(function() {
  if (!$("#box-2").hasClass("open")) {
    $(".flex-item").fadeOut();
    $("#box-2").addClass("open").css({
      "position": "absolute",
      "top": "0",
      "right": "0",
      "z-index": "500",
      "width": "100vw",
      "height": "100vh"
    });
  } else {
    $(".flex-item").fadeIn();
    $("#box-2").removeClass("open").css({
      "width": "50vw",
      "height": "50vh"
    });
    $("#box-2").delay(1000).qcss({
      "position": "initial",
      "z-index": "initial"
    });
  }
});