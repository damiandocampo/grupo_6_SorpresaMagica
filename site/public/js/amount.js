window.addEventListener('load', function() {

    function qsa(tag){
        return document.querySelectorAll(tag);
    };

    const moreButtons = qsa('.more');
    const lessButtons = qsa('.less')

    for(let i = 0; i < moreButtons.length; i++) {

        let button = moreButtons[i];

        button.addEventListener('click', function(e) {
            let buttonClicked = e.target;
            let input = buttonClicked.parentElement.children[1];
            input.value = parseInt(input.value) + 1;
        })

    };

    for(let i = 0; i < lessButtons.length; i++) {

        let button = lessButtons[i];

        button.addEventListener('click', function(e) {
            let buttonClicked = e.target;
            let input = buttonClicked.parentElement.children[1];
            if(input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        })

    };
    
});
