window.addEventListener("DOMContentLoaded", () => {

    // Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active")
        })
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active")
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    // Timer

    const deadline = "2024-06-10";
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date())

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num <=10 ) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds")
            Interval = setInterval(updateClock, 1000)

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(Interval)
            }
        }

    }

    setClock(".timer", deadline)

    // Modal 

    const modalTrigger = document.querySelectorAll("[data-modal]")
    const modalDisplay = document.querySelector(".modal")

    function openModal() {
        modalDisplay.classList.add("show")
        modalDisplay.classList.remove("hide")
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

  
    modalTrigger.forEach((item) => {
        item.addEventListener("click", openModal)
    })


    function closeModal() {
        modalDisplay.classList.add("hide")
        modalDisplay.classList.remove("show")
        document.body.style.overflow = "";
    }


        modalDisplay.addEventListener("click", (e) => {
            if (e.target === modalDisplay || e.target.getAttribute("data-close") == "") {
               closeModal()
            }
        })

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalClose.classList.contains("show")) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener("scroll", showModalByScroll)
            }
    }

    window.addEventListener("scroll", showModalByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(img, imgAlt, subtitle, descr, total, parentSelector, ...classes ) {
            this.img = img;
            this.imgAlt = imgAlt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.total = this.total * this.transfer;
        }

        render() {
            const element = document.createElement("div")

            if (this.classes.length === 0) {
                this.element = "menu__item"
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
            <img src="${this.img}" alt="${this.imgAlt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altImg, title, descr, price}) => {
    //             new MenuCard(img, altImg, title, descr, price, ".menu .container").render();
    //         })
    //     });

    getResource("http://localhost:3000/menu")
        .then(data => createCard(data))

    function createCard(data) {
        data.forEach(({img, altImg, title, descr, price}) => {
            const element = document.createElement("div")

            element.classList.add("menu__item");
            element.innerHTML = `
                  <img src="${img}" alt="${altImg}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
            `;

            document.querySelector(".menu .container").append(element);
        });
    }

//     let cards_one = new MenuCard("img/tabs/vegy.jpg", 
//     "vegy", 
//     `Меню "Фитнес"`, 
//     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
//     9, 
//     ".menu .container",
//     "menu__item",
//     "big"
// )

//     let cards_two = new MenuCard("img/tabs/elite.jpg", 
//     "elite", 
//     `Меню “Премиум”`, 
//     `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
//     14,
//     ".menu .container",
//     "menu__item",
//     "big"
//     )

//     let cards_three = new MenuCard("img/tabs/post.jpg", 
//     "post", 
//     `Меню "Постное"`, 
//     `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
//     21,
//     ".menu .container",
//     "menu__item",
//     "big"

// )

//     cards_one.render()
//     cards_two.render()
//     cards_three.render()


    // Forms

    const forms = document.querySelectorAll("form")


    forms.forEach((item) => {
        bindPostData(item);
    })

    const message = {
        loading: "img/forms/spinner.svg",
        success: "Спасибо! Мы скоро с вами свяжемся...",
        failure: "Упс... Что-то пошло не так."
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
             statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            // `
            form.insertAdjacentElement("afterend", statusMessage);

            // const request = new XMLHttpRequest();
            // request.open("POST", "server.php");

        
            // request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach((value,key) => {
            //     object[key] = value;
            // })

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData("http://localhost:3000/requests", json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove()
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

            // request.send(json)

            // request.addEventListener("load", () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove()
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // })

        })
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>

        `;
        document.querySelector(".modal").append(thanksModal)
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }

    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res))


    const slider = document.querySelector(".offer__slider"),
          slides = document.querySelectorAll(".offer__slide"),
          btnNext = document.querySelector(".offer__slider-next"),
          btnPrev = document.querySelector(".offer__slider-prev"),
          total = document.querySelector("#total"),
          current = document.querySelector("#current"),
          sliderWrapper = document.querySelector(".offer__slider-wrapper"),
          sliderField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1,
        offset = 0;

    sliderField.style.width = 100 * slides.length + "%";
    sliderField.style.display = "flex";    
    sliderField.style.transition = "0.5s all";
    
    sliderWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    })

   slider.style.position = "relative";

   const indicators = document.createElement("ol"),
         dots = [];

   indicators.classList.add("carousel-indicators")
   indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
   `;
   slider.append(indicators)

   for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot)
        dots.push(dot);
   }

   function dotForEach(dots, slideIndex) {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex-1].style.opacity = 1;
   }

   function setCurrent(slides, slideIndex, current) {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex
    }
   }

   function ReplaceStr(str) {
       return Number(str.replace(/\D/g, ""));
   }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    btnNext.addEventListener("click", () => {
        if (offset == ReplaceStr(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += ReplaceStr(width)
        }

        sliderField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrent(slides, slideIndex, current);
        dotForEach(dots, slideIndex);

    })

    btnPrev.addEventListener("click", () => {
        if ( offset == 0) {
            offset = ReplaceStr(width) * (slides.length - 1)
        } else {
            offset -= ReplaceStr(width)
        }

        sliderField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        setCurrent(slides, slideIndex, current);
        dotForEach(dots, slideIndex);
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = ReplaceStr(width) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            setCurrent(slides, slideIndex, current)

            dotForEach(dots, slideIndex);
        });
    });


    // легкий вариант слайдера
    
    // showSlides(slideIndex)

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`
    // } else {
    //     total.textContent = slides.length
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     } 
    //     if (n < 1) {
    //         slideIndex = slides.length
    //     }

    //     slides.forEach(item => item.style.display = "none")

    //     slides[slideIndex - 1].style.display = "block";

        
    // if (slides.length < 10) {
    //     current.textContent = `0${slideIndex}`
    // } else  {
    //     current.textContent = slideIndex
    // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // slidePrev.addEventListener("click", () => {
    //     plusSlides(-1)
    // })
    // slideNext.addEventListener("click", () => {
    //     plusSlides(1)
    // })

    // Calc

    const result = document.querySelector(".calculating__result span");
    let sex = "female", height, weight, age, ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight ||  !age || !ratio) {
            result.textContent = "...."
            return;
        } 
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }


    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                } else {
                    sex = e.target.getAttribute("id");
    
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
                calcTotal();
            })
        })
     }

     getStaticInformation("#gender", "calculating__choose-item_active");
     getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

     function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener("input", () => {
            switch(input.getAttribute("id")) {
                case "height": 
                    height = +input.value;
                    break;
                case "weight": 
                    weight = +input.value;
                    break;
                case "age": 
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
  
     }

     getDynamicInformation("#height");
     getDynamicInformation("#weight");
     getDynamicInformation("#age");
});