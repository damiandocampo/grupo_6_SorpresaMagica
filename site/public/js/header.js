window.addEventListener('load', () => {

    const qs = (tag) => document.querySelector(tag);
    const qsa = (tag) => document.querySelectorAll(tag)

    // nav

    const headerMobile = qs('div.header-mobile')
    const headerDesktop = qs('div.desktop')

    const navMobile = qs('nav.nav-bar')
    const navDesktop = qs('nav.nav-bar-desktop')

    document.addEventListener('scroll', () => {
        if(window.scrollY > headerDesktop.clientHeight) {
            navDesktop.classList.add('fixed')
        } else {
            navDesktop.classList.remove('fixed')
        }
    })

    document.addEventListener('scroll', () => {
        if(window.scrollY > headerMobile.clientHeight) {
            navMobile.classList.add('fixed')
        } else {
            navMobile.classList.remove('fixed')
        }
    })

    // menu

    const menu = qs('.ul-menu');
    const label = qs('.label-menu');
    const close = qs('.close-menu');

    label.addEventListener('click', function() {
        menu.classList.add('mostrar')
    })

    close.addEventListener('click', function() {
        menu.classList.remove('mostrar')
    })

    //marcas

    const categories = qsa('.categoriesLi')
    const brandsLI = qs('li.brands');
    const brandsUL = qs('.ul-brands');
    const icono = qs('.brands img');

    brandsLI.addEventListener('click', function() {
        brandsLI.classList.toggle('open')
        categories.forEach(category => {
            category.classList.toggle('openBrands');
        })
        icono.classList.toggle('openBrands');
        brandsUL.classList.toggle('openBrands');
    })

})
