// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//       });
//   });

$(document).ready(function () {

  //Слайдер

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  //Табы (вкладки) для каталога

  //Скрипт переключения табов

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // //Анимация карточки при нажатии на "Подробнее"

  // $('.catalog-item__link').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

  // //Анимация карточки при нажатии на "Назад"

  // $('.catalog-item__back').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })



  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Модальные окна

  //Вызов окна консультации

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  //Скрипт для закрытия окон (крестик)

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  //Подстановка названия товара в окно заказа

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  //Валидатор форм

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой номер",
        email: {
          required: "Пожалуйста, введите свой email",
          email: "Неправильный формат email"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  //Маска для номера

  $('input[name=phone]').mask("+38 (999) 999-99-99");

  //Плавный скрол и pageup

  $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {      //Если скролл сверху превышает 1600px - появляется стрелка
      $('.pageup').fadeIn();
    } 
    else {                                //Если не превышает 1600px, то стрелка скрыта
      $('.pageup').fadeOut();
    }
  });

  //Плавный скрол

  $("a[href^='#']").on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});

  //Подключение WOW библиотеки

new WOW().init();

});