<template>
    <div id="edit">
        <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <ul>
                <li>
                    <span>手机号</span>
                    <input type="text" readonly placeholder="请输入手机号码" maxlength="11" v-model="phone">
                    <div class="password_reset" @click="sendCode">{{ codeText }}</div>
                </li>
                <li>
                    <span>验证码</span>
                    <input placeholder="请输入验证码" maxlength="4" v-model="codeData.code">
                </li>
            </ul>

            <van-button type="primary" block @click="goNext">下一步</van-button>
        </div>
    </div>
</template>

<script>
    import { SendSmsApi, checkCodeApi  } from '../../../http/api'
    export default {
        data() {
            return {
                title: '重置登录密码',
                phone: localStorage.getItem('mobile'),
                // 验证码
                codeText: "获取验证码",
                codeSet: null,
                codeData: {
                    key: "",
                    code: ""
                },
            }
        }, 
        methods: {// 发送验证码
            sendCode () {
                var _this = this;
                if(this.codeText == '获取验证码' || this.codeText == '重新获取'){
                    this.codeText = '发送中'
                    SendSmsApi().then(res => {
                        _this.codeData.key = res.data.key;
                        var cont = 90;
                        _this.codeText = cont + "s";
                        _this.codeSet = setInterval(() => {
                            cont--;
                            _this.codeText = cont + "s";
                            if(cont == 0){
                                clearInterval(_this.codeSet);
                                _this.codeText = "重新获取"
                            }
                        }, 1000);
                    }).catch(err => {
                        _this.codeText = '获取验证码';
                        _this.$toast({
                            message: err.message,
                            position: 'bottom',
                        });
                    })
                }
            },
            goNext () {
                var _this = this;
                if(this.codeData.key == ''){
                    this.$toast({
                        message: '请获取验证码',
                        position: 'bottom',
                    });
                }else if(this.codeData.code == ''){
                    this.$toast({
                        message: '请输入验证码',
                        position: 'bottom',
                    });
                }else{
                    this.$loading.show()
                    checkCodeApi(_this.codeData).then(res => {
                        _this.$loading.hide()
                        if(_this.$route.path == '/resetPassword'){
                            _this.$router.push({
                                name: 'resetPasswordForm',
                                params: {
                                    code: res.data.code
                                }
                            })
                        }else{
                            _this.$router.push({
                                name: 'resetPayPasswordForm',
                                params: {
                                    code: res.data.code
                                }
                            })
                        }
                    }).catch(err => {
                        _this.$loading.hide()
                        _this.$toast({
                            message: err.message,
                            position: 'bottom',
                        });
                    })
                }
            }
        },
        mounted() {
            if(this.$route.path == '/resetPassword'){
                this.title = '重置登录密码'
            }else{
                this.title = '重置支付密码'
            }
        },  
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/my.less);
</style>