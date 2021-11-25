<template>
  <div id="login">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      logo
    </div>

    <div class="login_main">
      <h3>欢迎注册</h3>
      <h5>Welcome to register</h5>

      <div class="form fix">
        <van-form>
          <ul>
            <li>
              <p>上级</p>
              <input type="text" placeholder="请输入上级" />
            </li>
            <li>
              <p>手机号</p>
              <van-field
                v-model="r.mobile"
                maxlength="11"
                type="tel"
                placeholder="请输入手机号码"
                :rules="[
                  { pattern, required: true, message: '请输入正确手机号码' },
                ]"
              />
              <span @click="codeClick">{{ codeText }}</span>
            </li>
            <li>
              <p>验证码</p>
              <van-field
                v-model="r.code"
                type="number"
                maxlength="4"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
              />
            </li>
            <li>
              <p>密码</p>
              <van-field
                v-model="r.password"
                type="password"
                maxlength="20"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
              />
            </li>
            <li>
              <p>姓名</p>
              <van-field
                v-model="r.realname"
                maxlength="20"
                placeholder="请输入姓名"
                :rules="[{ required: true, message: '请输入姓名' }]"
              />
            </li>
            <li>
              <p>邮箱</p>
              <van-field
                v-model="r.email"
                placeholder="请输入邮箱"
                :rules="[{ required: true, message: '请输入邮箱' }]"
              />
            </li>
            <li>
              <p>推广渠道</p>
              <textarea
                maxlength="100"
                placeholder="推广渠道可不填，100字以内"
                cols="30"
                rows="3"
              ></textarea>
            </li>
            <li>
              <van-checkbox v-model="is_read" checked-color="#617DEF">
                我已经阅读并同意相关的<a>条款和隐私政策</a>
              </van-checkbox>
            </li>
          </ul>
        </van-form>
      </div>

      <van-button type="primary" round block @click="registerClick"
        >注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { SendSmsApi, registerApi } from "../../http/api.js";
export default {
  data() {
    return {
      // 注册提交
      r: {
        promote: "",
        mobile: "",
        code: "",
        key: "",
        password: "",
        realname: "",
        email: "",
        remark: "",
      },
      is_read: false,
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,
      // 验证码
      codeText: "获取验证码",
      // 定时器
      codeSet: null,
    };
  },
  methods: {
    // 获取验证码
    codeClick() {
      var _this = this;
      var tel = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      if (this.r.mobile == "") {
        this.$notify("请输入手机号");
      } else if (!tel.test(this.r.mobile)) {
        this.$notify("手机号格式错误");
      } else {
        if (this.codeText == "获取验证码" || this.codeText == "重新获取") {
          this.codeText = "发送中";
          var data = "?mobile=" + this.r.mobile;
          SendSmsApi(data)
            .then((res) => {
              _this.r.key = res.data.key;
              var cont = 90;
              _this.codeText = cont + "s";
              _this.codeSet = setInterval(() => {
                cont--;
                _this.codeText = cont + "s";
                if (cont == 0) {
                  clearInterval(_this.codeSet);
                  _this.codeText = "重新获取";
                }
              }, 1000);
            })
            .catch((err) => {
              _this.codeText = "获取验证码";
              _this.$notify(err.message);
            });
        }
      }
    },
    // 注册
    registerClick() {
      var _this = this;
      var tel = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      if (this.r.mobile == "") {
        this.$notify("请输入手机号");
      } else if (!tel.test(this.r.mobile)) {
        this.$notify("手机号格式错误");
      } else if (this.r.code == "") {
        this.$notify("请输入验证码");
      } else if (this.r.password == "") {
        this.$notify("请输入密码");
      } else if (this.r.realname == "") {
        this.$notify("请输入姓名");
      } else if (this.r.email == "") {
        this.$notify("请输入邮箱");
      } else if (this.r.key == "") {
        this.$notify("请获取验证码");
      } else if (!this.is_read) {
        this.$notify("请打勾服务条款");
      } else {
        _this.registerSubmit();
      }
    },
    registerSubmit() {
      var _this = this;
      this.$loading.show();
      registerApi(_this.r)
        .then((res) => {
          _this.$loading.hide();
          _this.$toast({
            message: res.data.message,
            position: "bottom",
          });
          _this.r = {
            mobile: "",
            code: "",
            key: "",
            password: "",
            realname: "",
            email: "",
            promote: "",
          };
          clearInterval(_this.codeSet);
          _this.codeText = "获取验证码";
        })
        .catch((err) => {
          _this.$loading.hide();
          _this.$message.error(err.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url(../../assets/css/login);
</style>
