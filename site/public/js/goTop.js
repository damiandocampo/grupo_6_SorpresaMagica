const button = document.querySelector('div.goTop');

function scroll() {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) { //clientHeight: altura visible, scrollTop: altura scrolleada
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

document.addEventListener("scroll", scroll);

button.addEventListener("click", scrollToTop);
