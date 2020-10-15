// number

// string - "", '', ``

// true/false

// null

// undefined

// let obj = {
//     name: 'apple',
//     color: 'green',
//     weight: 200
// }

// Symbol

// alert()

// console.log()

// let answer = confirm("are you 18?");
// console.log(answer);

// let answer = prompt("are you 18?");
// console.log(answer);

// console.log(2+2);

// let isChecked = true,
//     isClose = true;

// console.log(isChecked && isClose); and

// console.log(isChecked || isClose); or

// if (2*3 == 8*1) {
//     console.log("right")
// } else {
//     console.log("not right")
// }

// let answer = confirm("are you 18?");
// if (answer) {
//     console.log("enter")
// } else {
//     console.log("goaway")
// }

// const num = 50;

// if (num < 49) {
//     console.log("not right")
// } else if (num > 100) {
//     console.log('Many')
// }else {
//     console.log("right")
// }



// for (let i = 1; i < 8; i++) {
//     console.log(i);
// }


// function logging(a, b) {
//     console.log( a + b)
// }

// logging(5 ,7);

$(document).ready(function(){
    // carousel
    $('.carousel__inner').slick({
        // dots: true,
        speed: 500,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow:'<button type="button" class="slick-prev"><img src="icon/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
              }
        ]
      });

    //   tabs

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    //   list

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modals

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut();
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    });

    //validation


    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone ]').mask("+999 99-999-99-99");

  //sent message

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  //scroll up

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#up']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

  new WOW().init();

});