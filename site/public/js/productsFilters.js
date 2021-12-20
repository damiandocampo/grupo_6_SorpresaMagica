window.addEventListener('load', () => {
    console.log('vinculado');

    const qs = (tag) => document.querySelector(tag);
    const qsa = (tag) => document.querySelectorAll(tag);

    const form = qs('.filterBy');
    
    const cbInputs = qsa('.inputs');

    const categories = qsa('.cb-categories');
    const brands = qsa('.cb-brands');
    const discounts = qsa('.cb-discounts');

    cbInputs.forEach(input => {
        input.addEventListener('click', (e) => {
            form.submit()
        })
    });

    categories.forEach(category => {
        if(window.location.search.includes(`c=${category.value}`)) {
            category.checked = true
        } else {
            category.checked = false
        }
    });

    brands.forEach(brand => {
        if(window.location.search.includes(`b=${brand.value}`)) {
            brand.checked = true
        } else {
            brand.checked = false
        }
    });

    discounts.forEach(discount => {
        if(window.location.search.includes(`d=${discount.value}`)) {
            discount.checked = true
        } else {
            discount.checked = false
        }
    });

})
