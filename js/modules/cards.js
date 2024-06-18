function cards() {
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
};

module.exports = cards;