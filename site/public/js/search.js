window.addEventListener('load', function() {
    
    const form = document.querySelector('.search-form');
    const input = document.querySelector('input#search0');

    form.addEventListener('submit', function(e) {
        if(input.value.length < 1) {
            e.preventDefault();
        }
    })

    const form1 = document.querySelector('.search-form1');
    const input1 = document.querySelector('input#search1');

    form1.addEventListener('submit', function(e) {
        if(input1.value.length < 1) {
            e.preventDefault();
        }
    })

})