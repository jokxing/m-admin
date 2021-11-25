<template>
    <div id="edit">
        <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <ul>
                <li>
                    <span>旧密码</span>
                    <input type="password" placeholder="请输入旧密码" maxlength="20" v-model="data.old_pwd">
                    <div class="password_reset" @click="ForgetPwd">忘记密码？</div>
                </li>
                <li>
                    <span>新密码</span>
                    <input type="password" placeholder="请输入6-20位新密码" maxlength="20" v-model="data.pwd">
                </li>
                <li>
                    <span>确认新密码</span>
                    <input type="password" placeholder="请再次确认新密码" maxlength="20" v-model="againPass">
                </li>
            </ul>

            <van-button type="primary" block @click="submit">确认</van-button>
        </div>
    </div>
</template>

<script>
    import { updatePwdApi, updatePayPwdApi } from "../../../http/api"
    export default {
        data() {
            return {
                title: '编辑登录密码',
                data: {
                    old_pwd: "",
                    pwd: ""
                },
                againPass: ""
            }
        }, 
        methods: {
            // 判断登录密码还是支付密码
            submit() {
                if(this.data.old_pwd == ''){
                    this.$toast({
                        message: '请输入旧密码',
                        position: 'bottom',
                    });
                }else if(this.data.pwd == ''){
                    this.$toast({
                        message: '请输入新密码',
                        position: 'bottom',
                    });
                }else if (this.againPass != this.data.pwd){
                    this.$toast({
                        message: '两次密码输入不一致',
                        position: 'bottom',
                    });
                }else{
                    this.$loading.show();
                    if(this.$route.path == '/editPassword'){
                        this.loginPass(this.data)
                    }else{
                        this.payPass(this.data)
                    }
                }
            },
            // 修改登录密码-提交
            loginPass (data) {
                var _this = this;
                updatePwdApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                    _this.$router.go(-1);
                    localStorage.removeItem('passData');
                }).catch(err => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: err.message,
                        position: 'bottom',
                    });
                })
            },
            // 修改支付密码-提交
            payPass (data) {
                var _this = this;
                updatePayPwdApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                    _this.$router.go(-1)
                }).catch(err => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: err.message,
                        position: 'bottom',
                    });
                })
            },
            // 忘记密码
            ForgetPwd () {
                if(this.$route.path == '/editPassword'){
                    this.$router.push('/resetPassword')
                }else{
                    this.$router.push('/resetPayPassword')
                }
            }
        },
        mounted() {
            if(this.$route.path == '/editPassword'){
                this.title = '编辑登录密码'
            }else{
                this.title = '编辑支付密码'
            }
        },  
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/my.less);
</style>