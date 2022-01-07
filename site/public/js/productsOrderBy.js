window.addEventListener('load', () => {
    
    const qs = (tag) => document.querySelector(tag);

    const form = qs('.orderBy')

    const select = qs('.orderOptions')

    const az = qs('.optionAZ');
    const za = qs('.optionZA');
    const menorPrecio = qs('.menorPrecio');
    const mayorPrecio = qs('.mayorPrecio');

    if(window.location.search.includes('orderBy=za')) {
        za.selected = true
    } else if (window.location.search.includes('orderBy=menorPrecio')) {
        menorPrecio.selected = true;
    } else if (window.location.search.includes('orderBy=mayorPrecio')) {
        mayorPrecio.selected = true;
    } else {
        az.selected = true;
    }

    select.addEventListener('change', () => {
        form.submit();
    })

})
