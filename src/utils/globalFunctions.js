// Closes any modal
export function closeModal(modalBox, modalBackdrop) {
    modalBox.current[0].classList.replace("animate__slideInDown", "animate__slideOutUp");
    modalBox.current[1].classList.replace("animate__headShake", "animate__zoomOut");
    modalBox.current[2].classList.replace("animate__zoomIn", "animate__zoomOut");
    modalBox.current[3].classList.replace("animate__zoomIn", "animate__zoomOut");

    modalBackdrop.current.firstElementChild.classList.replace("animate__fadeIn", "animate__fadeOut");

    setTimeout(() => {
        modalBox.current[0].classList.replace("animate__slideOutUp", "animate__slideInDown");
        modalBox.current[1].classList.replace("animate__zoomOut", "animate__headShake");
        modalBox.current[2].classList.replace("animate__zoomOut", "animate__zoomIn");
        modalBox.current[3].classList.replace("animate__zoomOut", "animate__zoomIn");

        modalBackdrop.current.firstElementChild.classList.replace("animate__fadeOut", "animate__fadeIn");
        modalBackdrop.current.classList.add("hidden");
    }, 700);
}

//
export function change_active_option_status(elem, targetIndx, modalBackdrop, modalbox) {
    elem.current.forEach((each, indx) => {
        if (indx === targetIndx) {
            if (each.classList.contains("nav_option_active")) {
                closeModal(modalbox, modalBackdrop);
            }
            each.classList.toggle("nav_option_active");
        } else {
            each.classList.remove("nav_option_active");
        }
    });
}
