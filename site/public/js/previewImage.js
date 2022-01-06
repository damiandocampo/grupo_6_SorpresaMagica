window.addEventListener('load', function() {

    function qs(tag) {
        return document.querySelector(tag)
    };

    const input = qs('.image');
    const preview = qs('.image-preview');

    input.addEventListener('change', function(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function() {
            preview.src = reader.result;
        };
    });

});
