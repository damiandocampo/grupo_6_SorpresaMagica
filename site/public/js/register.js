window.addEventListener('load', () => {

    // functions

    var qs = (tag) => document.querySelector(tag);

    const functionValidate = (obj) => {
        let arr = Object.values(validate);

        console.log(validate);

        if (!arr.includes(false)) {
            bttn.disabled = false;
            bttn.classList.remove('disabled');
        } else {
            bttn.disabled = true;
            bttn.classList.add('disabled');
        }
    };

    // tags
    const firstName = qs('.firstName');
    const lastName = qs('.lastName');
    const email = qs('.email');
    const image = qs('.image');
    const password1 = qs('.password1');
    const password2 = qs('.password2');

    const bttn = qs('.bttn');

    //labels
    const lFirstName = qs('.lFirstName');
    const lLastName = qs('.lLastName');
    const lEmail = qs('.lEmail');
    const lImage = qs('.lImage');
    const lPassword1 = qs('.lPassword1');
    const lPassword2 = qs('.lPassword2');

    //smalls
    const sFirstName = qs('.sFirstName');
    const sLastName = qs('.sLastName');
    const sEmail = qs('.sEmail');
    const sImage = qs('.sImage');
    const sPassword1 = qs('.sPassword1');
    const sPassword2 = qs('.sPassword2');

    const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    firstName.focus = true;

    const validate = {
        firstName: false,
        lastName: false,
        email: false,
        image: true,
        password1: false,
        password2: false
    };

    bttn.disabled = true;
    bttn.classList.add('disabled');

    // validations
    
    firstName.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            firstName.classList.add('error');
            lFirstName.classList.add('text-error');
            sFirstName.innerHTML = 'El campo no puede estar vacío';
            validate.firstName = false;

        } else if(e.target.value.length < 2) {
            firstName.classList.add('error');
            lFirstName.classList.add('text-error');
            sFirstName.innerHTML = 'El nombre debe tener al menos 2 caracteres';
            validate.firstName = false;

        } else {
            firstName.classList.remove('error');
            lFirstName.classList.remove('text-error');
            sFirstName.innerHTML = '';
            validate.firstName = true;
        };

        functionValidate(validate);
    });

    lastName.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            lastName.classList.add('error');
            lLastName.classList.add('text-error');
            sLastName.innerHTML = 'El campo no puede estar vacío';
            validate.lastName = false;

        } else if(e.target.value.length < 2) {
            lastName.classList.add('error');
            lLastName.classList.add('text-error');
            sLastName.innerHTML = 'El apellido debe tener al menos 2 caracteres';
            validate.lastName = false;

        } else {
            lastName.classList.remove('error');
            lLastName.classList.remove('text-error');
            sLastName.innerHTML = '';
            validate.lastName = true;
        };

        functionValidate(validate);
    });

    email.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            email.classList.add('error');
            lEmail.classList.add('text-error');
            sEmail.innerHTML = 'El campo no puede estar vacío';
            validate.email = false;

        } else if(!regExEmail.test(e.target.value)) {
            email.classList.add('error');
            lEmail.classList.add('text-error');
            sEmail.innerHTML = 'El email debe tener un formato válido';
            validate.email = false;

        } else {
            email.classList.remove('error');
            lEmail.classList.remove('text-error');
            sEmail.innerHTML = '';
            validate.email = true;
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

    password1.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            password1.classList.add('error');
            lPassword1.classList.add('text-error');
            sPassword1.innerHTML = 'El campo no puede estar vacío';
            validate.password1 = false;

        } else if(!regExPass.test(e.target.value)) {
            password1.classList.add('error');
            lPassword1.classList.add('text-error');
            sPassword1.innerHTML = 'La contraseña de tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial. Por ejemplo: "Contraseña123!"';
            validate.password1 = false;

        } else {
            password1.classList.remove('error');
            lPassword1.classList.remove('text-error');
            sPassword1.innerHTML = '';
            validate.password1 = true;
        };

        functionValidate(validate);
    });

    password2.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            password2.classList.add('error');
            lPassword2.classList.add('text-error');
            sPassword2.innerHTML = 'El campo no puede estar vacío';
            validate.password2 = false;

        } else if(e.target.value !== password1.value) {
            password2.classList.add('error');
            lPassword2.classList.add('text-error');
            sPassword2.innerHTML = 'La contraseña no coincide';
            validate.password2 = false;

        } else {
            password2.classList.remove('error');
            lPassword2.classList.remove('text-error');
            sPassword2.innerHTML = '';
            validate.password2 = true;
        };

        functionValidate(validate);
    });

})
