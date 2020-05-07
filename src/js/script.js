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
  const modalOverlay = $('.landing-modal');
  const modalForm = $('.landing-modal__form');
  const modalCloseBtn = $('.landing-modal__close-btn');
  const modalPhoneField = $('.landing-modal__form-field--phone');
  const scrollableWrapper = $('.excavators__controls');

  var openModal = function (elements) {
    elements.click(function (e) {
      if ($(window).width() >= 768) {
        e.preventDefault();
        modalOverlay.addClass('landing-modal--open');
        $('body').addClass('modal-open');
      } else {
        if ($(e.target).hasClass('excavators__modal-trigger')) {
          e.preventDefault();
          scrollableWrapper.removeClass('excavators__controls--center').addClass('excavators__controls--right');
        } else {
          e.preventDefault();
          modalOverlay.addClass('landing-modal--open').addClass('landing-modal--animated');
          $('body').addClass('modal-open');
        };
      };
    });
  };

  openModal(modalTriggers);

  var closeModal = function () {
    if (modalOverlay.hasClass('landing-modal--animated')) {
      modalOverlay.removeClass('landing-modal--animated').addClass('landing-modal--animated-backwards');
      setTimeout(function () {
        modalOverlay.removeClass('landing-modal--open').removeClass('landing-modal--animated-backwards');
        $('body').removeClass('modal-open');
      }, 500);
    } else {
      modalOverlay.removeClass('landing-modal--open');
      $('body').removeClass('modal-open');
    };
  };

  modalCloseBtn.click(function () {
    closeModal();
  });

  modalOverlay.click(function (e) {
    if (!modalForm.is(e.target) && modalForm.has(e.target).length === 0) {
      closeModal();
    };
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    };
  });

  modalPhoneField.inputmask({
    'mask':'+7-999-9999999',
    'clearIncomplete': true,
    'greedy': false
  });

  modalForm.submit(function (e) {
    const messageBox = $('.landing-modal__subheading');

    e.preventDefault();
    modalForm.html('<p style="text-align: center;">Спасибо! Наш менеджер свяжется с Вами в ближайшее время.</p>');
    setTimeout(function () {
      closeModal();
    }, 1800);
  });

  //экскаваторы:
  const excavatorToggles = $('.excavators__item-link');
  const excavatorDetails = $('.excavators__details-wrapper');
  const excavatorBackBtn = $('.excavators__back-btn');
  const formBackBtn = $('.landing-modal__back-btn');

  excavatorToggles.each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      let excavatorId = $(this).data('excavator');

      if ($(window).width() >= 768) {
        if (!$(this).hasClass('excavators__item-link--active') && !$('body').hasClass('excavators-changing')) {
          excavatorToggles.removeClass('excavators__item-link--active');
          $(this).addClass('excavators__item-link--active');

          $('body').addClass('excavators-changing');
          excavatorDetails.removeClass('excavators__details-wrapper--active').fadeOut(250);
          excavatorDetails.each(function () {
            let excavator = $(this);

            if (excavator.attr('data-excavator') == excavatorId) {
              $(this).addClass('excavators__details-wrapper--active');
              setTimeout(function () {
                excavator.fadeIn(250);
              }, 250);
              setTimeout(function () {
                $('body').removeClass('excavators-changing');
              }, 500);
            };
          });
        };
      } else {
        excavatorToggles.removeClass('excavators__item-link--active');
        $(this).addClass('excavators__item-link--active');

        excavatorDetails.removeClass('excavators__details-wrapper--active').hide();
        excavatorDetails.each(function () {
          let excavator = $(this);

          if (excavator.attr('data-excavator') == excavatorId) {
            $(this).addClass('excavators__details-wrapper--active').show();
            scrollableWrapper.addClass('excavators__controls--center');
          };
        });
      };
    });
  });

  excavatorBackBtn.click(function () {
    scrollableWrapper.removeClass('excavators__controls--center');
  });

  formBackBtn.click(function () {
    scrollableWrapper.removeClass('excavators__controls--right').addClass('excavators__controls--center');
  });

  //квиз:
  const quiz = $('.quiz__questions');
  const quizQuestions = $('.quiz__question');
  const quizPrevBtn = $('.quiz__navigation .quiz__navigation-btn--prev');
  const quizNextBtn = $('.quiz__navigation .quiz__navigation-btn--next');
  const quizSubmitBtn = $('.quiz__navigation .quiz__navigation-btn--submit');
  const quizRadios = $('.quiz__radio-input');

  quiz.slick({
    prevArrow: quizPrevBtn,
    nextArrow: quizNextBtn,
    autoPlay: false,
    // adaptiveHeight: true,
    dots: true,
    // appendDots: quizDots,
    customPaging: function (slider, i) {
        return '<a class="quiz__status-dot" data-slide="' + i + '" href="#"></a>';
    },
    infinite: false,
    speed: 100,
    fade: true,
    draggable: false,
    swipe: false,
    touchMove: false
  });

  var questionsAnswered = new Array();
  const refreshQuizStatus = function () {
    quizQuestions.each(function () {
      let questionId = $(this).data('slide');
      if (questionsAnswered[questionId] === true) {
        $('.quiz .slick-dots').find('.quiz__status-dot[data-slide=' + questionId + ']').removeClass('quiz__status-dot--unanswered');
        $('.quiz .slick-dots').find('.quiz__status-dot[data-slide=' + questionId + ']').addClass('quiz__status-dot--answered');
      } else if (questionsAnswered[questionId] === false) {
        $('.quiz .slick-dots').find('.quiz__status-dot[data-slide=' + questionId + ']').addClass('quiz__status-dot--unanswered');
        $('.quiz .slick-dots').find('.quiz__status-dot[data-slide=' + questionId + ']').removeClass('quiz__status-dot--answered');
      };
    });
  };

  const quizDot = $('.quiz__status-dot');
  quizDot.click(function (e) {
    e.preventDefault();
  });

  quiz.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (!$(this).find($('.slick-slide[data-slick-index=' + currentSlide + ']')).find('input').is(':checked')) {
      questionsAnswered[currentSlide] = false;
    } else {
      questionsAnswered[currentSlide] = true;
    };

    refreshQuizStatus();
  });

  quiz.on('afterChange', function (event, slick, currentSlide) {
    if (slick.$slides.length-1 == currentSlide) {
      quizNextBtn.css('display', 'none');
      quizSubmitBtn.css('display', 'block');
    } else {
      quizNextBtn.css('display', 'block');
      quizSubmitBtn.css('display', 'none');
    };

    if (!$(this).find($('.slick-slide[data-slick-index=' + currentSlide + ']')).find('input').is(':checked')) {
      questionsAnswered[currentSlide] = false;
    } else {
      questionsAnswered[currentSlide] = true;
    };

    refreshQuizStatus();
  });

  quizRadios.change(function () {
    let slide = $(this).parents('.quiz__question');
    let slideId = slide.data('slide');

    if (slide.find('input').is(':checked')) {
      questionsAnswered[slideId] = true;
    };

    refreshQuizStatus();
  });

  //отправка результатов квиза:
  quizSubmitBtn.click(function (e) {
    e.preventDefault();
    let valid = true;

    for (let i = 0; i < questionsAnswered.length; i++) {
      if (questionsAnswered[i] === false || questionsAnswered[i] === undefined) {
        valid = false;
        $('.quiz .slick-dots').find('.quiz__status-dot[data-slide=' + i + ']').addClass('quiz__status-dot--unanswered');
      };
    };

    if (valid === true) {
      modalOverlay.addClass('landing-modal--open');
      $('body').addClass('modal-open');
    } else {
      alert('Пожалуйста, ответьте на все вопросы!');
    };
  });

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

  //fancybox для изображений:
  const zoomableImages = $('.section__img-lightbox');

  zoomableImages.fancybox({
    buttons : [
      'close'
    ],
    loop: false,
    keyboard: true,
    arrows: true,
    smallBtn: true,
    toolbar: 'auto'
  });
});
