$(function ($) {
  $( ".datepicker" ).datepicker();


  // $.datepicker.setDefaults($.datepicker.regional['ru']);

  /* mask */
  //$(".input-phone").mask("+7(999) 999-99-99");
  /* navigator */
  var ua = navigator.userAgent;
  // с помощью регулярок проверяем наличие текста,
  // соответствующие тому или иному браузеру
  // if (ua.search(/Chrome/) > 0) console.log('Google Chrome');
  // if (ua.search(/Firefox/) > 0) $('body').addClass('body_firefox');
  // if (ua.search(/Opera/) > 0) console.log('Opera');
  // if (ua.search(/Safari/) > 0) console.log('Safari');
  // if (ua.search(/MSIE/) > 0) console.log('Internet Explorer');

  /* -- owl-carusel ---
  $('#baner-slider').owlCarousel({
    margin: 0,
    items: 1,
    autoplayTimeout: 10000,
    autoplay: true,
    dots: false,
    nav: false,
    navText: ["<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
    responsive: {
      768: {
        nav: false,
      },
      1199: {
        nav: false,
      },
      1200: {
        nav: false,
      }
    }
  });
   */
  /* -- slick-slider ---*/

  $('#baner-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
  });
  $('#product-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
  });
  $('#product-slider-establishments').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
  });
  /* $('.manufactures-slider').slick({
   infinite: true,
   slidesToShow: 6,
   slidesToScroll: 1,
   arrows: true,
   dots: false,
   speed: 500,
   prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
   nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
   responsive: [
     {
       breakpoint: 1320,
       settings: {
         slidesToShow: 5
       }
     },
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 3
       }
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1
       }
     }
   ]
 });

*/



  var winWidth = $(document).width();
  // if (winWidth < 767) {
  //   $('#activation').attr('colspan', 6);
  // }

  /* quantity-selector */
  // $("[data-fancybox]").fancybox({
  //   toolbar: "auto",
  //   buttons: [
  //     'slideShow',
  //     'close'
  //   ],
  //   loop: true,
  //   keyboard: true,
  //   arrows: true,
  //   infobar: true,
  //   modal: true,
  //   idleTime: 3,
  // });


  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 1024) {
      $('#scroll').fadeIn();
      $(".header").addClass('fixed');
    } else {
      $('#scroll').fadeOut();
      $(".header").removeClass('fixed');
    }
  });
  $('#scroll').click(function () {
    $("html, body").animate({scrollTop: 0}, 600);
    return false;
  });

  $(document).on('click', '.slct', function (e) {
    var dropBlock = $(this).parent().find('.drop');
    if (dropBlock.is(':hidden')) {
      dropBlock.slideDown(150);
      $(this).addClass('active');
      $('.drop').find('li').click(function () {
        var selectResult = $(this).html();
        var selectValue = $(this).attr('value');
        //console.log(selectValue);
        $(this).parent().parent().find('input').val(selectValue).trigger('change');
        //console.log($(this).parent().parent().find('input').val());
        $(this).parent().parent('.select').find('.slct').removeClass('active').html(selectResult);
        dropBlock.slideUp(150);
      });
    } else {
      $(this).removeClass('active');
      dropBlock.slideUp();
    }
    //console.log('I am work!!');
    return false;
  });

  if ( $(window).width() > 1200 ) {
    // console.log('$(window).width() > 1200', $(window).width())
    $('.menu li').hover(
      function () {
        $(this).addClass('hover')
        //$('.header').addClass('hover')
      },
      function () {
        $(this).removeClass('hover')
        //$('.header').removeClass('hover')
      }
    )
    setTimeout(function(){
      if ($('.header').hasClass('hover')){
        let subHeight = $('.menu .act .sub').height();
        document.querySelector('.header').style.marginBottom = subHeight + 'px'
        // console.log($('.header'))
        // console.log(subHeight)
      }else{
        //console.log('none class hover')
      }
    }, 100)
  }
  if ($(window).width() < 1200) {
    //console.log('$(window).width() < 1200', $(window).width())
    $('.menu li').click(function () {
      $(this).toggleClass('active')
    })
  }

  $('.showPass').parent().click(function(){
    let inp = $(this).children('input'),
      type = inp.attr('type') == "text" ? "password" : 'text';
    inp.prop('type', type);
  });

  $('.nav-tabs').on('click', function(e){
    console.log(e.target.href)

    e.preventDefault();
    console.log(e.target)

    let targetElem = e.target,
      tabHref = $(targetElem).attr('href'),
      tabH1 = $(targetElem).text(),
      parentAtive = $(e.target).parent('li')
    console.log($(tabHref).parent().hasClass('tab-content-in'))
    console.log(parentAtive)
    console.log(tabH1)

    if ($(this).hasClass('nav-tabs-in')){
      $('.tab-content-in > .tab-pane').removeClass('in active')
      $('.nav-tabs-in > li').removeClass('active')
    } else if ($(this).hasClass('nav-tabs-btn')){
      $('.tab-content-btn > .tab-pane').removeClass('in active')
      $('.nav-tabs-btn > li').removeClass('active')
    } else{
      $('.tab-pane').not('.tab-pane-in').not('.tab-pane-btn').removeClass('in active')
      $('.nav-tabs').not('.nav-tabs-in').not('.nav-tabs-btn').find('li').removeClass('active')
      $('.baner-section-in .h1').text(tabH1)
    }
    $(tabHref).addClass('in active')
    parentAtive.addClass('active')

  })




});
$(document).mouseup(function (e) {
  var container = $(".drop");

  if ((container.has(e.target).length === 0)) {
    container.slideUp(150);
  }
});

function showPopup(target, elem, img, imgSm, arr) {
  event.preventDefault();
  $(".darken").addClass('active')
  $(target).addClass('open');
  if (elem){
    let title = elem.innerText;
    //console.log(title)
    document.querySelector(`${target} .h3`).innerText = title
    //console.log(document.querySelector(`${target} .h3`).innerText)
    document.querySelector('#baner-img .img1').src = img;
    document.querySelector('#baner-img .img2').src = imgSm;
    //console.log(document.querySelector('#baner-img').src)
    //console.log(img)
    let list = document.querySelector(`${target} .list`)
    list.innerHTML = arr
  }
}

function hidePopup(target) {
  $(".darken").removeClass('active')
  $(target).removeClass('open');
}

function touchMenu(elem, menu) {
  $(elem).toggleClass('active');
  $(menu).toggleClass('active');
  $('.darken').toggleClass('active');
  //addIconsMenu(menu);
}

// function addIconsMenu(menu) {
//   console.log(menu);
//   $(menu + ' li').each(function () {
//     $(this).children('.add').click(function () {
//       console.log('click');
//       $(this).toggleClass('active').parent('li').children('ul').toggleClass('show');
//     });
//   });
// };

window.addEventListener('load', function () {
  let darken = document.querySelector('.darken');
  let menuJS = document.querySelector('#menu');
  let menuALL = document.querySelectorAll('.menu > li');
  let close = document.querySelector('.close');
  let touch = document.querySelector('.touch_menu');
  let selectDate = document.querySelector('.select-date');
  let popupAll = document.querySelectorAll('.popup')


  darken.addEventListener('click', function (e) {
    //console.log(e)
    darken.classList.remove('active');
    popupAll.forEach((e)=>{
      e.classList.remove('open');
    })

    menuJS.classList.remove('active');
    touch.classList.remove('active');
    menuALL.forEach((e) => {
      e.classList.remove('active')
    })
  });

  close.addEventListener('click', function () {
    darken.classList.remove('active');
    menuJS.classList.remove('active');
    touch.classList.remove('active');
    menuALL.forEach((e) => {
      e.classList.remove('active')
    })
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // let btnAll = document.querySelectorAll('.btn-js');
  // btnAll.forEach((e) => {
  //   e.addEventListener('click', function (event) {
  //     event.preventDefault();
  //     console.log(e);
  //     let modal = document.querySelector(e.getAttribute('data-modal'));
  //     let close = document.querySelector('.close');
  //     let darken = document.querySelector('.darken');
  //     let menu = document.querySelector('.menu-js');
  //     let formAction = e.getAttribute('data-action');
  //
  //     let modalFormId = e.getAttribute('data-form-id');
  //     let modalForm = modal.querySelector('.form');
  //     modalForm.setAttribute('id', modalFormId);
  //
  //     let resultId = e.getAttribute(('data-result'))
  //     let result = modalForm.querySelector('.result');
  //     result.setAttribute('id', resultId);
  //
  //     let bthSubmit = modalForm.querySelector('button.btn');
  //     let bthSubmitSpan = modalForm.querySelector('button.btn span');
  //     console.log('bthSubmitSpan', bthSubmitSpan);
  //     let dataTextBtn = e.getAttribute('data-text-btn');
  //     console.log('dataTextBtn', dataTextBtn);
  //     bthSubmitSpan.innerText = dataTextBtn;
  //
  //     bthSubmit.addEventListener('click', function () {
  //       let newmodalFormId = '#' + modalFormId;
  //       let newresultId = '#' + resultId;
  //       send(formAction, newmodalFormId, newresultId);
  //     })
  //     close.addEventListener('click', function () {
  //       modal.classList.remove("open");
  //       darken.classList.remove('active');
  //     });
  //     darken.addEventListener('click', function (e) {
  //       console.log(e)
  //       modal.classList.remove("open");
  //       darken.classList.remove('active');
  //       darken.classList.remove('active');
  //       menu.classList.remove('active');
  //     });
  //     if (e.hasAttribute('data-modal')) {
  //       modal.classList.add("open");
  //       darken.classList.add('active');
  //     }
  //
  //   })
  // });
})


function send(url, form_id, result_div) {
  // console.log('url', url);
  // console.log('form_id', form_id);
  // console.log('result_div', result_div);
  jQuery.ajax({
    type: "POST",
    url: url,
    data: jQuery(form_id).serialize(),
    // Выводим то что вернул PHP
    success: function (html) {
      //console.log('success', html);
      jQuery(result_div).fadeIn(1800);
      jQuery(result_div).empty();
      jQuery(result_div).append(html);

      setTimeout(function () {
        jQuery(document).ready(function () {
          jQuery(result_div).fadeOut(1800);
        });
      }, 60000)
    },
    error: function (html) {
      //console.log('error', html);
      // jQuery(result_div).empty();
      // jQuery(result_div).append("Ошибка!");
    }
  });
}
