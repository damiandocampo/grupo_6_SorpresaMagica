window.addEventListener('load', () => {

    // functions

    var qs = (tag) => document.querySelector(tag);

    const functionValidate = (obj) => {
        let arr = Object.values(validate);

        console.log(validate);

        if (!arr.includes(false)) {
            btn.disabled = false;
            btn.classList.remove('disabled');
        } else {
            btn.disabled = true;
            btn.classList.add('disabled');
        }
    };

    // tags
    const title = qs('.title');
    const brand = qs('.brand');
    const price = qs('.price');
    const discount = qs('.discount');
    const category = qs('.category');
    const featured = qs('.featured');
    const description = qs('.description');
    const image = qs('.image');

    const btn = qs('.button');

    //labels
    const lTitle = qs('.lTitle');
    const lBrand = qs('.lBrand');
    const lPrice = qs('.lPrice');
    const lDiscount = qs('.lDiscount');
    const lCategory = qs('.lCategory');
    const lFeatured = qs('.lFeatured');
    const lDescription = qs('.lDescription');
    const lImage = qs('.lImage');
    //smalls
    const sTitle = qs('.sTitle');
    const sBrand = qs('.sBrand');
    const sPrice = qs('.sPrice');
    const sDiscount = qs('.sDiscount');
    const sCategory = qs('.sCategory');
    const sFeatured = qs('.sFeatured');
    const sDescription = qs('.sDescription');
    const sImage = qs('.sImage');

    title.focus = true;

    const validate = {
        title: false,
        brand: false,
        price: false,
        discount: true, // es opcional
        category: false,
        featured: false,
        description: false,
        image: true, // es opcional
    };

    btn.disabled = true;
    btn.classList.add('disabled');

    // validations
    
    title.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            title.classList.add('error');
            lTitle.classList.add('text-error');
            sTitle.innerHTML = 'El campo no puede estar vacío';
            validate.title = false;

        } else if(e.target.value.length < 5) {
            title.classList.add('error');
            lTitle.classList.add('text-error');
            sTitle.innerHTML = 'El nombre debe tener al menos 5 caracteres';
            validate.title = false;

        } else {
            title.classList.remove('error');
            lTitle.classList.remove('text-error');
            sTitle.innerHTML = '';
            validate.title = true;
        };

        functionValidate(validate);
    });

    brand.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            brand.classList.add('error');
            lBrand.classList.add('text-error');
            sBrand.innerHTML = 'El campo no puede estar vacío';
            validate.brand = false;

        } else if(e.target.value.length < 3) {
            brand.classList.add('error');
            lBrand.classList.add('text-error');
            sBrand.innerHTML = 'La marca debe tener al menos 3 caracteres';
            validate.brand = false;

        } else {
            brand.classList.remove('error');
            lBrand.classList.remove('text-error');
            sBrand.innerHTML = '';
            validate.brand = true;
        };

        functionValidate(validate);
    });

    price.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            price.classList.add('error');
            lPrice.classList.add('text-error');
            sPrice.innerHTML = 'El campo no puede estar vacío';
            validate.price = false;

        } else if(e.target.value < 1) {
            price.classList.add('error');
            lPrice.classList.add('text-error');
            sPrice.innerHTML = 'El precio no puede ser menor a 0';
            validate.price = false;

        } else {
            price.classList.remove('error');
            lPrice.classList.remove('text-error');
            sPrice.innerHTML = '';
            validate.price = true;

        };

        functionValidate(validate);
    });

    discount.addEventListener('blur', (e) => {

        if(e.target.value < 0 || e.target.value > 100) {
            discount.classList.add('error');
            lDiscount.classList.add('text-error');
            sDiscount.innerHTML = 'El descuento debe estar entre 0 y 100';
            validate.discount = false;
        } else {
            discount.classList.remove('error');
            lDiscount.classList.remove('text-error');
            sDiscount.innerHTML = '';
            validate.discount = true;
        };

        functionValidate(validate);
    });

    category.addEventListener('blur', (e) => {

        if(e.target.value < 1 || e.target.value > 7) {
            category.classList.add('error');
            lCategory.classList.add('text-error');
            sCategory.innerHTML = 'Es necesario seleccionar una categoría válida';
            validate.category= false;
        } else {
            category.classList.remove('error');
            lCategory.classList.remove('text-error');
            sCategory.innerHTML = '';
            validate.category= true;
        };

        functionValidate(validate);
    });

    featured.addEventListener('blur', (e) => {

        if(e.target.value !== '0' && e.target.value !== '1') {
            featured.classList.add('error');
            lFeatured.classList.add('text-error');
            sFeatured.innerHTML = 'Es necesario indicar si es un producto destacado';
            validate.featured = false;
        } else {
            featured.classList.remove('error');
            lFeatured.classList.remove('text-error');
            sFeatured.innerHTML = '';
            validate.featured = true;
        };

        functionValidate(validate);
    });

    description.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            description.classList.add('error');
            lDescription.classList.add('text-error');
            sDescription.innerHTML = 'El campo no puede estar vacío';
            validate.description = false;

        } else if(e.target.value.length < 20) {
            description.classList.add('error');
            lDescription.classList.add('text-error');
            sDescription.innerHTML = 'La descripción debe ser de al menos 20 caracteres';
            validate.description = false;

        } else {
            description.classList.remove('error');
            lDescription.classList.remove('text-error');
            sDescription.innerHTML = '';
            validate.description = true;
        };

        functionValidate(validate);
    });

    image.addEventListener('blur', (e) => {

        if(e.target.files[0]) {

            var extension = e.target.files[0].type;

            if(extension !== 'image/jpeg' && extension !== 'image/png') {
                image.classList.add('error');
                lImage.classList.add('text-error');
                sImage.innerHTML = 'Se debe ingresar un formato de imágen válido';
                validate.image = false;

            } else if(extension === 'image/jpeg' || extension === 'image/png') {
                image.classList.remove('error');
                lImage.classList.remove('text-error');
                sImage.innerHTML = '';
                validate.image = true;
            };

            functionValidate(validate);

        } else {
            image.classList.remove('error');
            lImage.classList.remove('text-error');
            sImage.innerHTML = '';
            validate.image = true;
        }
    });

})
