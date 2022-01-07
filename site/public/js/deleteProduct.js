window.addEventListener('load', function() {

    const deleteForms = document.querySelectorAll('.delete-form');

    deleteForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            Swal.fire({
                title: '¿Quieres eliminar este producto?',
                text: 'Esta acción no se podrá revertir.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                showCloseButton: true,
                backdrop: true,
                allowOutsideClick: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit()
                }
            })
        })
    })

})
