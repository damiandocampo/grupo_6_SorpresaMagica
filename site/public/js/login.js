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
    const email = qs('.email');
    const password = qs('.password');

    const bttn = qs('.bttn');

    //labels
    const lEmail = qs('.lEmail');
    const lPassword = qs('.lPassword');

    //smalls
    const sEmail = qs('.sEmail');
    const sPassword = qs('.sPassword');

    const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    email.focus = true;

    const validate = {
        email: false,
        password: false,
    };

    bttn.disabled = true;
    bttn.classList.add('disabled');

    // validations
    
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

    password.addEventListener('blur', (e) => {

        if(e.target.value === '') {
            password.classList.add('error');
            lPassword.classList.add('text-error');
            sPassword.innerHTML = 'El campo no puede estar vacío';
            validate.password = false;

        } else {
            password.classList.remove('error');
            lPassword.classList.remove('text-error');
            sPassword.innerHTML = '';
            validate.password = true;
        };

        functionValidate(validate);
    });


    // Ver contraseña

    function showHide() {
        if(password.type === 'password') {
            password.setAttribute('type', 'text');
            show.style.display = 'none';
            hide.style.display = 'block';
        } else {
            password.setAttribute('type', 'password');
            hide.style.display = 'none';
            show.style.display = 'block';
        }
    }
    
    const show = qs('.show');
    const hide = qs('.hide');

    hide.style.display = "none";

    show.addEventListener('click', function() {
        showHide()
    })

    hide.addEventListener('click', function() {
        showHide()
    })

})
