<template>
  <div class="loader-container">
    <div class="loader"></div>
    <p class="loader-info">正在鉴权</p>
  </div>
</template>
<script setup>
import { API } from "../../../shared/APIHelper";
import { useNotification } from "naive-ui";
const notification = useNotification();
import { useRouter, useRoute } from "vue-router";
const router = useRouter(),
  route = useRoute();

API.get("/zujuan-ink-be-core/auth/status").then((v) => {
  if (v.auth) {
    router.push("./home");
  } else {
    if (localStorage.getItem("__thost_zujuanink_auth")) {
      const AutologinSetting = JSON.parse(
        localStorage.getItem("__thost_zujuanink_auth")
      );
      if (AutologinSetting.autologin) {
        API.post("/zujuan-ink-be-core/auth/json/login", {
          password: AutologinSetting.authcode,
        }).then((v) => {
          notification.success({
            content: "已连接至API并成功鉴权。",
            duration: 2000,
          });
          router.push("./home");
        });
      } else {
        router.push("./settings");
      }
    } else {
      router.push("./settings");
    }
  }
});
</script>

<style scoped>
.loader-container {
  width: fit-content;
  display: block;
  margin: 0 auto;
  text-align: center;
}
.loader-info {
  font-family: Cambria, "kaiti", Cochin, Georgia, Times, "Times New Roman",
    serif;
}
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #362a79;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  -webkit-animation: rotation 1s linear infinite;
  animation: rotation 1s linear infinite;
}
.loader:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #8960d9 transparent;
}
@-webkit-keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
