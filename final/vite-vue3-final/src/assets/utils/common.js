import axios from 'axios'
import { swal2 } from '../../assets/utils/sweetalert.js'

export const common = {

    checkAdmin: function (success, fail) {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        )
        if (token === undefined || token.length === 0) {
            if (fail instanceof Function) {
                fail()
            }
        } else {
            axios.defaults.headers.common.Authorization = token
            axios.post(`${import.meta.env.VITE_API_ROOT}/api/user/check`)
                .then(() => {
                    if (success instanceof Function) {
                        success()
                    }
                })
                .catch((err) => {
                    swal2.toastErrorMsg(err.message)
                    if (fail instanceof Function) {
                        fail()
                    }
                })
                .finally(() => {
                    // loader.hide()
                })
        }
    }
}
