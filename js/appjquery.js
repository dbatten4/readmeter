$(document).ready(function() {

  var titleTarget = $('.title_box');
  var titleTargetHeight = 200;

  $(document).scroll(function(e) {
    var scrollPercent = (titleTargetHeight - window.scrollY) / titleTargetHeight;
    if(scrollPercent >= 0) {
      titleTarget.css('opacity', scrollPercent);
    };
  });

});
