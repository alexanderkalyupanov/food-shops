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

    let cards_one = new MenuCard("img/tabs/vegy.jpg", 
    "vegy", 
    `Меню "Фитнес"`, 
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    9, 
    ".menu .container",
    "menu__item",
    "big"
)

    let cards_two = new MenuCard("img/tabs/elite.jpg", 
    "elite", 
    `Меню “Премиум”`, 
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    14,
    ".menu .container",
    "menu__item",
    "big"
    )

    let cards_three = new MenuCard("img/tabs/post.jpg", 
    "post", 
    `Меню "Постное"`, 
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
    21,
    ".menu .container",
    "menu__item",
    "big"

)

    cards_one.render()
    cards_two.render()
    cards_three.render()


    // Forms

    const forms = document.querySelectorAll("form")


    forms.forEach((item) => {
        postData(item);
    })

    const message = {
        loading: "img/forms/spinner.svg",
        success: "Спасибо! Мы скоро с вами свяжемся...",
        failure: "Упс... Что-то пошло не так."
    }


    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
             statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            // `
            form.insertAdjacentElement("afterend", statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

  
            request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);

            const object = {};
            formData.forEach((value,key) => {
                object[key] = value;
            })

            const json = JSON.stringify(object);
            request.send(json)

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove()
                } else {
                    showThanksModal(message.failure);
                }
            })

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
});