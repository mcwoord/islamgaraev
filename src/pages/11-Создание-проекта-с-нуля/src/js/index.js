$(document).ready(function () {
    let tourNumber = 0;
    let feedbackNumber = 0;
    let numberOfPersonsValue = null;
    let yourName = $('#yourName');
    let yourPhoneNumber = $('#yourPhoneNumber');
    let numberOfPersons = $('.number-of-persons');
    let menu = $('.menu');    
    let trigram = $('#trigram');
    menu.hide();
    $('.image-link').magnificPopup({ type: 'image' });
    wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animate__animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
      }
      )
      wow.init();

    function tourProgramDraw() {
        $('#tourImage').attr('src', `images/${tourProgram[tourNumber].imageName}`)
        $('.tour-program-info h4').html(`<span>${tourProgram[tourNumber].date}</span> / ${tourProgram.length}`);
        $('.tour-program-info h5').html(tourProgram[tourNumber].title);
        $('.tour-program-info p').html(tourProgram[tourNumber].description);
    }

    tourProgramDraw();

    function feedbackDraw() {
        $('.person-name').html(feedback[feedbackNumber].name);
        $('.review-number').html(feedback[feedbackNumber].id + '/' + feedback.length);
        $('.review-text').html(feedback[feedbackNumber].text);
        $('.feedback-image img').attr('src', `images/${feedback[feedbackNumber].imageName}`);
    }

    feedbackDraw();

    function slideLeft(objectList, count) {
        console.log(objectList);
        count -= 1;
        console.log(count);
        if (count < 0) {
            count = objectList.length - 1;
        }
        console.log(count);
    }

    function slideRight(objectList, count) {
        count += 1;
        if (count > objectList.length - 1) {
            count = 0;
        }
    }

    $('#btnLeft').click(() => {
        tourNumber -= 1;
        if (tourNumber < 0) {
            tourNumber = tourProgram.length - 1;
        }
        tourProgramDraw();
    })

    $('#btnRight').click(() => {
        tourNumber += 1;
        if (tourNumber > tourProgram.length - 1) {
            tourNumber = 0;
        }
        tourProgramDraw();
    })

    function removeAnimationClasses() {
        let animatedCard = $('#animated-card');
        animatedCard.removeClass('animate__fadeInRight');
        animatedCard.removeClass('animate__fadeOutLeft');
        animatedCard.removeClass('animate__fadeOutRight');
        animatedCard.removeClass('animate__fadeInLeft');
    }

    $('#revBtnLeft').click(() => {
        let animatedCard = $('#animated-card');
        removeAnimationClasses();
        animatedCard.addClass('animate__fadeOutLeft');
        feedbackNumber -= 1;
        if (feedbackNumber < 0) {
            feedbackNumber = feedback.length - 1;
        }
        feedbackDraw();
        setTimeout(() => {
            removeAnimationClasses();
            animatedCard.addClass('animate__fadeInRight');
        }, 600);
    })

    $('#revBtnRight').click(() => {
        let animatedCard = $('#animated-card');
        removeAnimationClasses();
        animatedCard.addClass('animate__fadeOutRight');
        feedbackNumber += 1;
        if (feedbackNumber > feedback.length - 1) {
            feedbackNumber = 0;
        }
        feedbackDraw();
        setTimeout(() => {
            removeAnimationClasses();
            animatedCard.addClass('animate__fadeInLeft');
        }, 600);
    })

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                nav: true,
                loop: false
            }
        }
    })

    $('.button-block button').click((event) => {
        $('.button-block button').removeClass('button-pressed');
        $(event.target).addClass('button-pressed');
        numberOfPersonsValue = $(event.target).text();
    })

    yourName.on('keydown', () => {
        if (parseInt(event.key)) {
            event.preventDefault();
        }
    })

    yourPhoneNumber.inputmask("+1-(999) 999 99 99");

    function digitiseNumber(inputValue) {
        let digitalNumber = '';
        for (let item of inputValue) {
            if (item === '-' || item === '_' || item === ' ' || item === '(' || item === ')' || item === '+') {
                continue;
            } else {
                digitalNumber += item;
            }
        }
        return digitalNumber;
    }

    $('#sendRequest').click(function () {
        yourName.css({ borderColor: 'white' });
        yourPhoneNumber.css({ borderColor: 'white' });
        numberOfPersons.css({ color: 'white' });
        let isValid = true;
        console.log(digitiseNumber(yourPhoneNumber.val()));


        if (!yourName.val()) {
            isValid = false;
            yourName.css({ borderColor: 'red' });
        }

        if (digitiseNumber(yourPhoneNumber.val()).length < 11) {
            isValid = false;
            yourPhoneNumber.css({ borderColor: 'red' });
        }

        if (numberOfPersonsValue === null) {
            isValid = false;
            numberOfPersons.css({ color: 'red' });
        }

        if (isValid) {
            $.ajax({
                type: "POST",
                url: "https://testologia.site/checkout",
                data: {
                    name: yourName.val(),
                    phoneNumber: 45658456
                },
                success: function (response) {
                    if (response['success'] === 1) {
                        Swal.fire({
                            title: 'Спасибо!',
                            text: 'Мы свяжемся с вами в ближайщее время.',
                            imageUrl: '../../images/Iceland-popup.jpg',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                        })
                        $('.button-block button').removeClass('button-pressed');
                        yourPhoneNumber.val(null);
                        yourName.val(null);
                    } else {
                        alert('Извините. Что-то пошло не так.');
                    }
                }
            });
        } else {
            alert('Заполните поля формы');
        }
    })
    
    trigram.click(()=> {
        menu.show();
    })
    
    $('.menu ul li a, #btnClose').click(()=> {
        menu.hide();        
    })
    









})