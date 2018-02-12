var $ = require('jquery');
require('slick-carousel');

$(document).ready(function(){
    var data = $("div.section").data('grouping');

    $("div.section").slick({
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              slidesToShow: data[2].items,
              dots: true
            }
          },
          {
            breakpoint: 512,
            settings: {
              arrows: false,
              slidesToShow: data[1].items,
              dots: true
            }
          },
          {
            breakpoint: 0,
            settings: {
              arrows: false,
              slidesToShow: data[0].items,
              dots: true
            }
          }
        ],
        infinite: false,
        mobileFirst: true,
      });
});

$("div.section").on('click', function() {
    console.log($(this).data('grouping'));
});