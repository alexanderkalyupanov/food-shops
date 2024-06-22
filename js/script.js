require ("es6-promise").polyfill();

import tabs  from "./modules/tabs";
import  modal, { openModal }  from "./modules/modal";
import  timer  from "./modules/timer";
import  cards  from "./modules/cards";
import  slider  from "./modules/slider";
import  forms from  "./modules/forms";
import  calc from "./modules/calc";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);


    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalTimerId);
    timer(".timer", "2024-08-10");
    cards();
    calc();
    forms("form", modalTimerId);
    slider({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        slide: ".offer__slide",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCouter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"

    });

});

    // Tabs
  

    // Timer

    
    // Modal 

 
    // Используем классы для карточек



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

    


