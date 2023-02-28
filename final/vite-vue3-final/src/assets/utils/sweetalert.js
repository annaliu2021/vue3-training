import swal from 'sweetalert2'

export const swal2 = {
    confirm: function (title, text, success) {
        swal.fire({
            title,
            text,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: '確定',
            cancelButtonText: '取消'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                swal.fire('執行成功!', '', 'success')
                if (result.isConfirmed && success) {
                    success()
                }
            } else if (result.isDenied) {
                swal.fire('執行失敗', '', 'error')
            }
        })
    },
    toastSuccMsg: function (text) {
        swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        }).fire({
            icon: 'success',
            text
        })
    },
    toastErrorMsg: function (text) {
        swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        }).fire({
            icon: 'error',
            text
        })
    },
    toastWarningMsg: function (text) {
        swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        }).fire({
            icon: 'warning',
            text
        })
    }
}
