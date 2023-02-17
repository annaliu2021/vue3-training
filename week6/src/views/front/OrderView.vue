<template>
  <div class="container">
    <h2 class="fs-3 fw-bold text-center mb-3">填寫訂購資訊</h2>
    <ul class="d-flex list-unstyled row gap-4">
      <li
        class="align-items-center bg-light col d-flex justify-content-center p-0 text-secondary"
        style="height: 60px"
      >
        <span>確認購物車內容</span>
      </li>
      <li
        class="align-items-center bg-light col d-flex justify-content-center p-0 text-secondary"
        style="height: 60px"
      >
        <span>填寫訂購資訊</span>
      </li>
      <li
        class="align-items-center bg-light col d-flex justify-content-center p-0 text-secondary"
        style="height: 60px"
      >
        <span>完成訂單</span>
      </li>
    </ul>
    <Form
      @submit="onSubmit"
      class="my-4"
      v-slot="{ errors }"
      ref="formContainer"
      id="orderForm"
    >
      <div class="mb-3">
        <label for="name" class="form-label">訂購人姓名</label>
        <Field
          type="text"
          class="form-control"
          id="name"
          placeholder="請輸入訂購人姓名"
          name="姓名"
          :class="{ 'is-invalid': errors['姓名'] }"
          v-model="order.user.name"
          rules="required"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">訂購人Email</label>
        <Field
          type="email"
          class="form-control"
          id="email"
          placeholder="請輸入訂購人Email"
          name="Email"
          :class="{ 'is-invalid': errors['Email'] }"
          v-model="order.user.email"
          rules="email|required"
        >
        </Field>
        <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">訂購人手機號碼</label>
        <Field
          type="tel"
          class="form-control"
          id="tel"
          placeholder="請輸入訂購人手機號碼"
          name="手機號碼"
          :class="{ 'is-invalid': errors['手機號碼'] }"
          v-model="order.user.tel"
          :rules="checkPhone"
        ></Field>
        <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">訂購人地址</label>
        <Field
          type="text"
          class="form-control"
          id="address"
          placeholder="請輸入訂購人地址"
          name="地址"
          :class="{ 'is-invalid': errors['地址'] }"
          v-model="order.user.address"
          rules="required"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">備註</label>
        <Field v-model="order.message" name="備註">
          <textarea
            class="form-control"
            id="message"
            rows="3"
            v-model="order.message"
            name="備註"
          ></textarea>
        </Field>
      </div>
      <div class="d-flex justify-content-center my-3">
        <RouterLink
          type="button"
          class="btn btn-outline-secondary me-3"
          to="/Cart"
        >
          上一步:返回購物車
        </RouterLink>
        <button type="submit" class="btn btn-danger" :disabled="isDisabled">
          送出訂購單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "./zh_TW.json";
import AllRules from "@vee-validate/rules";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    zh_TW,
  }),
});
setLocale("zh_TW");

const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

const loadingSetting = {
  loader: "dots",
  canCancel: true,
  color: "#36495e",
};

export default {
  data() {
    return {
      order: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      isDisabled: false,
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.isDisabled = true;
      let loader = this.$loading.show(loadingSetting);

      this.$http
        .post(`${VITE_API_ROOT}/api/${VITE_API_PATH}/order`, {
          data: this.order,
        })
        .then((response) => {
          //console.log(response.data);
          alert(response.data.message);
          document.querySelector("#orderForm").reset();
          loader.hide();
        })
        .catch((err) => {
          alert("訂單送出失敗");
          //console.log(err.response.data.message);
          loader.hide();
        })
        .finally(() => {
          this.isDisabled = false;
        });
    },
    checkPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "手機號碼不正確，必須為09開頭。";
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
};
</script>
