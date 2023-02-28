<template>
    <section class="container-fluid bg-light" style="position: relative; height: 100vh;">
        <!-- 左側圖片區塊 -->
        <div class="row">
            <!-- 圖片 -->
            <div class="col-lg-6 bg-cover"></div>
            <!-- 背景圖加上半透明遮罩（行動版時才加上） -->
            <div class=" col-lg-6 bg-mask"></div>
        </div>

        <!-- 右側文字區塊 -->
        <div class="row justify-content-lg-end align-items-center" style="height: 100vh;">
            <!-- 圖片 -->
            <!-- 背景圖加上半透明遮罩（行動版時才加上） -->
            <div class="col col-lg-6">
                <div class="d-flex justify-content-center align-item-center">
                    <div class="card border-secondary" style="width:400px;height: 400px;">
                        <div class="card-body">
                            <h5 class="text-center border-bottom pb-3 border-secondary text-secondary">登入後台</h5>
                            <form class="pt-1" @submit.prevent="login">
                                <div class="d-flex flex-column" style="height: 300px">
                                    <div class="mb-3">
                                        <label for="username" class="form-label">帳號</label>
                                        <input v-model="user.username" type="email" class="form-control" id="username"
                                            placeholder="請輸入帳號" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="sp" class="form-label">密碼</label>
                                        <input v-model="user.password" type="password" class="form-control" id="sp"
                                            placeholder="請輸入密碼" required>
                                    </div>
                                    <div class="mt-auto">
                                        <button type="submit" class="btn btn-secondary w-100">登入</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { swal2 } from '../../assets/utils/sweetalert.js'
import { common } from '../../assets/utils/common.js'
const { VITE_API_ROOT } = import.meta.env

export default {
    data () {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    mounted () {
        common.checkAdmin(this.gotoProducts, this.gotoLogin)
    },
    methods: {
        gotoProducts () {
            this.$router.push({ name: 'adminProducts' })
        },
        gotoLogin () {
            this.$router.push({ name: 'login' })
        },
        login () {
            //   console.log(this.user.username, this.user.password)
            const url = `${VITE_API_ROOT}/admin/signin`
            this.$http
                .post(url, this.user)
                .then((response) => {
                    const { token, expired, message } = response.data
                    document.cookie = `hexToken=${token};expires=${new Date(
                        expired
                    )}; path=/`
                    swal2.toastSuccMsg(message)
                    this.$router.push({ name: 'adminProducts' })
                })
                .catch((err) => {
                    swal2.toastErrorMsg(err.message)
                })
        }
    }
}
</script>

<style>
.bg-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    /* background-image: url('https://i.ibb.co/zRd6Kbz/maria-teneva-PFVTZSq-Iqn0-unsplash.jpg'); */
    background-image: url('../../assets/images/backend-bg.jpg');
    background-position: center 60%;
    background-repeat: no-repeat;
    background-size: cover;

}

.bg-mask {
    position: absolute;
    top: 0;
    bottom: 0;
}

/* md 以上要使用深色字 */
@media(min-width: 768px) {
    .text-md-dark {
        color: #333;
    }
}

/* 背景圖加上半透明遮罩（行動版時才加上） */
@media(max-width: 768px) {
    .bg-mask {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
        /*     background-color: rgba(0,0,0,0.5); */
    }
}
</style>
