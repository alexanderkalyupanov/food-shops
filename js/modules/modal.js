function modal() {
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

}

module.exports = modal