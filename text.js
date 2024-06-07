const forms = document.querySelectorAll("form");

    const message = {
        loading: "Загрузка",
        success: "Спасибо! Cкоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    }

    forms.forEach((item) => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            form.append(statusMessage)
            // statusMessage.src = message.loading;
            // statusMessage.style.cssText = `
            //     display: block;
            //     margin: 0 auto;
            // // `
            // form.insertAdjacentElement("afterend", statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);


            // манипуляции для jsonа
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            })

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success
                    // showThanksModal(message.success);
                    form.reset();
                    setTimeout(() => {
                                            // statusMessage.remove();
                    }, 2000)

                } else {
                    // showThanksModal(message.failure);
                    statusMessage.textContent = message.failure
                }
            })
        })
    }


