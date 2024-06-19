
function openModal(modalSelector, modalTimerId) {
    const modalDisplay = document.querySelector(modalSelector);

    modalDisplay.classList.add("show")
    modalDisplay.classList.remove("hide")
    document.body.style.overflow = "hidden";

    console.log(modalTimerId)
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}


function closeModal(modalSelector) {
    const modalDisplay = document.querySelector(modalSelector);
    modalDisplay.classList.add("hide")
    modalDisplay.classList.remove("show")
    document.body.style.overflow = "";
}


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector)
    const modalDisplay = document.querySelector(modalSelector)


    modalTrigger.forEach((item) => {
        item.addEventListener("click", () => openModal(modalSelector, modalTimerId))
    })


        modalDisplay.addEventListener("click", (e) => {
            if (e.target === modalDisplay || e.target.getAttribute("data-close") == "") {
               closeModal(modalSelector)
            }
        })

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalClose.classList.contains("show")) {
            closeModal(modalSelector)
        }
    })


    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener("scroll", showModalByScroll)
            }
    }

    window.addEventListener("scroll", showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};