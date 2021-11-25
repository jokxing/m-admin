<template>
  <div id="login">
    <div class="header">logo</div>

    <div class="login_main">
      <h3>欢迎登录</h3>
      <h5>Welcome to login</h5>

      <div class="form fix">
        <van-form>
          <ul>
            <li>
              <p>您的账号</p>
              <van-field
                v-model="username"
                placeholder="请输入账号"
                :rules="[{ required: true, message: '请输入您的账号' }]"
              />
            </li>
            <li>
              <p>密码</p>
              <van-field
                v-model="password"
                type="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入您的密码' }]"
              />
            </li>
            <li>
              <div class="float_l">
                <van-checkbox v-model="is_remember" checked-color="#617DEF"
                  >记住账号</van-checkbox
                >
              </div>
            </li>
          </ul>
        </van-form>
      </div>

      <van-button type="primary" round block @click="loginClick"
        >登录</van-button
      >

      <h6>
        没有账号？
        <router-link to="/register">立即注册</router-link>
      </h6>
    </div>
  </div>
</template>

<script>
import { loginApi } from '../../http/api'
export default {
  data() {
    return {
      username: "",
      password: "",
      is_remember: false,
    };
  },
  methods: {
    // 登录按钮
    loginClick() {
      if (this.username == "") {
        this.$notify("请填写账号");
      } else if (this.password == "") {
        this.$notify("请填写密码");
      } else {
        var data = {
          username: this.username,
          password: this.password,
        };
        this.loginSubmit(data);
      }
    },
    // 提交
    loginSubmit(data) {
      var _this = this;
      this.$loading.show();
      loginApi(data)
        .then((res) => {
          _this.$loading.hide();
          if (_this.is_remember) {
            var passData = {
              username: this.username,
              password: this.password,
            };

            var passDatas = JSON.stringify(passData);
            localStorage.setItem("passData", passDatas);
          } else {
            if (localStorage.getItem("passData")) {
              localStorage.removeItem("passData");
            }
          }

          const expires_time =
            new Date().getTime() + res.data.expires_in * 1000;
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("expires_time", expires_time);

          localStorage.setItem("level_id", res.data.level_id);

          _this.$router.push("/home");
        })
        .catch((err) => {
          _this.$loading.hide();
          _this.$notify(err.message);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("passData")) {
      var passData = JSON.parse(localStorage.getItem("passData"));
      this.is_remember = true;
      this.username = passData.username;
      this.password = passData.password;
    }
  },
};
</script>

<style lang="less" scoped>
    @import url(../../assets/css/login);
</style>
