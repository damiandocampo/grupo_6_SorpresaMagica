window.addEventListener('load', () => {

    console.log('vinculado header');

    const qs = (tag) => document.querySelector(tag)

    const body = qs('body')

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
})
