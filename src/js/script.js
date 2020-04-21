$(document).ready(function() {
  //модалки:
  const modalTriggers = $('.section__btn, .company-info__modal-trigger');
  const modal = $('.modal');

  modalTriggers.click(function (e) {
    e.preventDefault();
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
    touchMove: false,
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
