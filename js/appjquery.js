$(document).ready(function() {

  var titleTarget = $(".title_container");
  var resultsTarget = $(".results_container");
  var targetHeight = 200;

  $(document).scroll(function(e) {
    var titleScrollPercent = (targetHeight - window.scrollY) / targetHeight;
    var resultsScrollPercent = 1 - ((targetHeight - window.scrollY) / targetHeight);
    if(titleScrollPercent >= 0) {
      titleTarget.css('opacity', titleScrollPercent);
      resultsTarget.css('opacity', resultsScrollPercent);
    };
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    $(".title").css("transform","translateY(" + (-scroll / 3) + "px)");
  });

});
