window.addEventListener('load', () => {

    console.log('vinculado');
    
    const qs = (tag) => document.querySelector(tag);

    const sliderSection = qs('.slider');

    const article1 = qs('#art1');
    const article2 = qs('#art2');
    const article3 = qs('#art3');
    const article4 = qs('#art4');

    const bttns = document.querySelectorAll('.bttn');
    const bttn1 = qs('#bttn1');
    const bttn2 = qs('#bttn2');
    const bttn3 = qs('#bttn3');
    const bttn4 = qs('#bttn4');

    let sliderArticle = document.querySelectorAll('.slider-article');
    let sliderArticleLast = sliderArticle[sliderArticle.length - 1];

    const leftArrow = qs('#left-arrow');
    const rightArrow = qs('#right-arrow');

    sliderSection.insertAdjacentElement('afterbegin', sliderArticleLast)
        
    function Next() {

        let sliderArticle = document.querySelectorAll('.slider-article');

        bttns.forEach(bttn => bttn.classList.remove('active'));
        if(sliderArticle[2] === article1) {
            bttn1.classList.add('active')
        }
        if(sliderArticle[2] === article2) {
            bttn2.classList.add('active')
        }
        if(sliderArticle[2] === article3) {
            bttn3.classList.add('active')
        }
        if(sliderArticle[2] === article4) {
            bttn4.classList.add('active')
        }

        let sliderArticleFirst = document.querySelectorAll('.slider-article')[0];
        sliderSection.style.marginLeft = '-200%';
        sliderSection.style.transition = 'all 0.5s';
        setTimeout(() => {
            sliderSection.style.transition = 'none';
            sliderSection.insertAdjacentElement('beforeend', sliderArticleFirst);
            sliderSection.style.marginLeft = '-100%';
        }, 500);
    };

    function Previous() {
        let sliderArticle = document.querySelectorAll('.slider-article');

        bttns.forEach(bttn => bttn.classList.remove('active'));
        if(sliderArticle[0] === article1) {
            bttn1.classList.add('active')
        }
        if(sliderArticle[0] === article2) {
            bttn2.classList.add('active')
        }
        if(sliderArticle[0] === article3) {
            bttn3.classList.add('active')
        }
        if(sliderArticle[0] === article4) {
            bttn4.classList.add('active')
        }

        let sliderArticleLast = sliderArticle[sliderArticle.length - 1];
        sliderSection.style.marginLeft = '0';
        sliderSection.style.transition = 'all 0.5s';
        setTimeout(() => {
            sliderSection.style.transition = 'none';
            sliderSection.insertAdjacentElement('afterbegin', sliderArticleLast)
            sliderSection.style.marginLeft = '-100%';
        }, 500);
    };

    rightArrow.addEventListener('click', () => {
        Next()
    });

    leftArrow.addEventListener('click', () => {
        Previous()
    });

    setInterval(() => {
        Next(500);
    }, 5000);

})
