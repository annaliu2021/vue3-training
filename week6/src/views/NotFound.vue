<template>
  <div class="wrap">
    <div class="mainbox">
      <div class="err">4</div>
      <font-awesome-icon icon="far fa-question-circle" class="far" spin />
      <div class="err2">4</div>
      <div class="msg">
        網頁不存在，點選<RouterLink :to="{ name: 'home' }">此處</RouterLink
        >回到首頁。
      </div>
    </div>
  </div>
</template>

<script>
// 1.加入google fonts
// 2.加入 fortawesome

import "@fontsource/nunito-sans";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

library.add(faQuestionCircle);

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>
<style>
.wrap {
  width: 100%;
  height: 100vh;
  background-color: #95c2de;
}

.mainbox {
  /* background-color: #95c2de; */
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

.err {
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 11rem;
  position: absolute;
  left: 20%;
  top: 8%;
}

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 18%;
  color: #fff;
}

.err2 {
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 11rem;
  position: absolute;
  left: 68%;
  top: 8%;
}

.msg {
  text-align: center;
  font-family: "Nunito Sans", sans-serif;
  font-size: 1.6rem;
  position: absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

a {
  text-decoration: none;
  color: #fff;
}

a:hover {
  text-decoration: underline;
  color: #fff;
}
</style>
