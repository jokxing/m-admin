<template>
    <div id="edit">
        <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <ul>
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
    import { setPwdApi, setPayPwdApi } from "../../../http/api"
    export default {
        data() {
            return {
                title: '重置登录密码',
                data: {
                    code: "",
                    pwd: ""
                },
                againPass: ""
            }
        }, 
        methods: {
            // 判断登录密码还是支付密码
            submit() {
                if(this.data.pwd == ''){
                    this.$toast({
                        message: '请输入新密码',
                        position: 'bottom',
                    });
                }else if(this.againPass == ''){
                    this.$toast({
                        message: '请输入再次确认新密码',
                        position: 'bottom',
                    });
                }else if (this.againPass != this.data.pwd){
                    this.$toast({
                        message: '两次密码输入不一致',
                        position: 'bottom',
                    });
                }else{
                    this.$loading.show();
                    if(this.$route.path == '/resetPasswordForm'){
                        this.resetPass(this.data)
                    }else{
                        this.resetPayPass(this.data)
                    }
                }
            },
            // 修改登录密码-提交
            resetPass (data) {
                var _this = this;
                setPwdApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                    _this.$router.go(-2);
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
            resetPayPass (data) {
                var _this = this;
                setPayPwdApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                    _this.$router.go(-2)
                }).catch(err => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: err.message,
                        position: 'bottom',
                    });
                })
            },
        },
        mounted() {
            if(this.$route.path == '/resetPasswordForm'){
                this.title = '重置登录密码'
            }else{
                this.title = '重置支付密码'
            }

            if(!this.$route.params.code){
                this.$router.go(-1)
            }else{
                this.data.code = this.$route.params.code
            }
        },  
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/my.less);
</style>