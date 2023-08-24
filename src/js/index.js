var card = $('.card');


$(document).ready(function () {

    let messageSent = $('#messageSent');
    let messageNotSent = $('#messageNotSent');
    messageSent.hide();
    messageNotSent.hide();
    $('.modal-background').hide();
    $('.modal-form-background').hide();
    $('.close').hide();

    $('.card').tilt({
        glare: true,
        maxGlare: 0.2,
        maxTilt: 5,
        scale: 1.1
    })

    // function delay(ms) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    // async function PromiseTimeOut() {
    //     console.log("Старт");
    //     for (let i = 0; i < card.length; i++) {
    //         card.eq(i).css('opacity', '1');
    //         await delay(100); // ждем одну секунду перед выполнением следующей итерации цикла
    //     }
    //     console.log("Цикл завершен!");
    // }
    // // PromiseTimeOut()



    $('.close').click(() => {
        $('.modal-background').hide();
        $('.close').hide();
    })

    $('.cardNumber02').click(function () {
        $('.modal-background').show();
        $('.close').show();

    })
















    $('.linkedin').mouseover(function (event) {
        $('.qr-linkedin').show();
        $('.qr-whatsapp').hide();
        $('.qr-instagram').hide();
        $('.qr-telegram').hide();
    });
    $('.whatsapp').mouseover(function (event) {
        $('.qr-linkedin').hide();
        $('.qr-whatsapp').show();
        $('.qr-instagram').hide();
        $('.qr-telegram').hide();
    });
    $('.instagram').mouseover(function (event) {
        $('.qr-linkedin').hide();
        $('.qr-whatsapp').hide();
        $('.qr-instagram').show();
        $('.qr-telegram').hide();
    });
    $('.telegram').mouseover(function (event) {
        $('.qr-linkedin').hide();
        $('.qr-whatsapp').hide();
        $('.qr-instagram').hide();
        $('.qr-telegram').show();
    });




    let nameInput = $('#nameInput');
    let emailInput = $('#emailInput');
    let textInput = $('#textInput');
    let submitButton = $('#submitButton');

    submitButton.click(() => {
        let hasError = false;
        nameInput.css('border-color', '#6B6B6B');
        emailInput.css('border-color', '#6B6B6B');
        textInput.css('border-color', '#6B6B6B');

        if (!nameInput.val()) {
            nameInput.css('border-color', 'red');
            hasError = true;
        }

        if (!emailInput.val()) {
            emailInput.css('border-color', 'red');
            hasError = true;
        }

        if (!textInput.val()) {
            textInput.css('border-color', 'red');
            hasError = true;
        }

        if (hasError === false) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: `Посетитель сайта ${nameInput.val()}\nE-mail: ${emailInput.val()}\nОставил сообщение: ${textInput.val()}`,
                dataType: "dataType",
                success: function (response) {
                    $('contact-me-text #form').hide();
                    $('contact-me-text #form').reset();
                    messageSent.show();

                },
                error: () => {
                    messageNotSent.show();
                }
            });
        }

        $('#okButton').click(() => {
            messageNotSent.hide();
        })

    })






    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };


    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);















});