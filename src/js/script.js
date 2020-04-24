$(document).ready(function() {
  //промотка вниз в шапке:
  const scrollDownBtn = $('.header__scroll-down');

  scrollDownBtn.click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#main').offset().top
    }, 500);
  });

  //модалки:
  const modalTriggers = $('.section__btn, .company-info__modal-trigger, .excavators__modal-trigger');
  const modal = $('.modal');

  modalTriggers.click(function (e) {
    e.preventDefault();
  });

  //экскаваторы:
  const excavatorToggles = $('.excavators__item-link');
  const excavatorDetails = $('.excavators__details-wrapper');

  excavatorToggles.each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      let excavatorId = $(this).data('excavator');

      if (!$(this).hasClass('excavators__item-link--active')) {
        excavatorToggles.removeClass('excavators__item-link--active');
        $(this).addClass('excavators__item-link--active');

        excavatorDetails.removeClass('excavators__details-wrapper--active').fadeOut(250);
        excavatorDetails.each(function () {
          let excavator = $(this);

          if (excavator.attr('data-excavator') == excavatorId) {
            $(this).addClass('excavators__details-wrapper--active');
            setTimeout(function () {
              excavator.fadeIn(250);
            }, 250);
          };
        });
      };      
    });
  });

  //квиз:
  const quiz = $('.quiz__questions');
  const quizPrevBtn = $('.quiz__navigation .quiz__navigation-btn--prev');
  const quizNextBtn = $('.quiz__navigation .quiz__navigation-btn--next');
  const quizSubmitBtn = $('.quiz__navigation .quiz__navigation-btn--submit');

  quiz.slick({
    prevArrow: quizPrevBtn,
    nextArrow: quizNextBtn,
    autoPlay: false,
    adaptiveHeight: true,
    dots: false,
    infinite: false,
    speed: 100,
    fade: true,
    draggable: false,
    swipe: false,
    touchMove: false
  });

  quiz.on('afterChange', function(event, slick, currentSlide) {
    if (slick.$slides.length-1 == currentSlide) {
      quizNextBtn.css('display', 'none');
      quizSubmitBtn.css('display', 'block');
    } else {
      quizNextBtn.css('display', 'block');
      quizSubmitBtn.css('display', 'none');
    };
  });

  //отправка результатов квиза:
  const quizForm = $('form.quiz');

  quizForm.submit(function (e) {
    e.preventDefault();
  });

  //выбор офиса:
  const officeToggles = $('.company-info__office-select');
  const officeLists = $('.company-info__regions-list');
  const officeItems = $('.company-info__region');
  const officePhones = $('.company-info__contacts-phone');
  const officeAddresses = $('.company-info__office-option');

  //открытие списка с офисами:
  officeToggles.each(function () {
    let thisOfficeList = $(this).next('.company-info__regions-list');
    let toggle = $(this);

    $(this).click(function (e) {
      e.preventDefault();
      thisOfficeList.toggleClass('company-info__regions-list--open');
    });

    $(document).mouseup(function (e) {
      if (!thisOfficeList.is(e.target) && thisOfficeList.has(e.target).length === 0 && !toggle.is(e.target) && toggle.has(e.target).length === 0) {
        thisOfficeList.removeClass('company-info__regions-list--open');
      };
    });
  });

  //смена номера и адреса, соотв. выбранному офису:
  officeItems.click(function (e) {
    e.preventDefault();
    let officeId = $(this).data('office');
    officePhones.removeClass('company-info__contacts-phone--active');
    officeAddresses.removeClass('company-info__office-option--active')
    officePhones.each(function () {
      if ($(this).attr('data-office') == officeId) {
        $(this).addClass('company-info__contacts-phone--active');
      }
    });
    officeAddresses.each(function () {
      if ($(this).attr('data-office') == officeId) {
        $(this).addClass('company-info__office-option--active');
      }
    });
    officeLists.removeClass('company-info__regions-list--open');
  });
});

// var officeListCall = function (toggle) {
//   let thisOfficeList = toggle.next('.company-info__regions-list');
//
//   toggle.click(function (e) {
//     e.preventDefault();
//     thisOfficeList.toggleClass('company-info__regions-list--open');
//   });
//
//   $(document).mouseup(function (e) {
//     if (!thisOfficeList.is(e.target) && thisOfficeList.has(e.target).length === 0 && !toggle.is(e.target) && toggle.has(e.target).length === 0) {
//         thisOfficeList.removeClass('company-info__regions-list--open');
//     };
//   });
// };
//
// officeListCall(officeToggles);
