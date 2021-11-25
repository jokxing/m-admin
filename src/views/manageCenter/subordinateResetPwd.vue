<template>
    <div id="subordinateResetPwd">
        <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-form @submit="submit">
                <van-field
                    type="password"
                    v-model="data.password"
                    :name="label"
                    :label="label"
                    :placeholder="placeholder"
                    maxlength="20"
                    :rules="[{ required: true, message: placeholder }]"
                />

                <van-row class="btn">
                    <van-button type="primary" block>确认</van-button>
                </van-row>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { agentSubordinateResetPasswordApi, agentSubordinateResetPayPasswordApi } from '../../http/api'
    export default {
        data() {
            return {
                title: '重置登陆密码',
                data:{
                    id: '',
                    password: '',
                },
                label: '登陆密码',
                placeholder: '请输入登陆密码'
            }
        },
        methods: {
            submit() {
                var _this = this;
                if(this.$route.query.type == 'payPwd'){
                    if(this.data.password.length < 6){
                        this.$toast({
                            message: '密码最长不能少于6位字符',
                            position: 'bottom',
                        });
                    }else{
                        // this.$loading.show();
                        // agentSubordinateResetPayPasswordApi(_this.data).then(res => {
                        //     _this.$loading.hide();
                        //     _this.$toast({
                        //         message: res.data.message,
                        //         position: 'bottom',
                        //     });
                        //     _this.$router.go(-1)
                        // }).catch(err => {
                        //     _this.$loading.hide();
                        //     _this.$toast({
                        //         message: err.message,
                        //         position: 'bottom',
                        //     });
                        // })
                    }
                }else{
                    this.$loading.show();
                    if(this.data.password.length < 8){
                        this.$toast({
                            message: '密码最长不能少于8位字符',
                            position: 'bottom',
                        });
                    }else{
                        // agentSubordinateResetPasswordApi(_this.data).then(res => {
                        //     _this.$loading.hide();
                        //     _this.$toast({
                        //         message: res.data.message,
                        //         position: 'bottom',
                        //     });
                        //     _this.$router.go(-1)
                        // }).catch(err => {
                        //     _this.$loading.hide();
                        //     _this.$toast({
                        //         message: err.message,
                        //         position: 'bottom',
                        //     });
                        // })
                    }
                }
                
            }  
        },
        mounted () {
            if(this.$route.query.type == 'payPwd'){
                this.title = '重置支付密码';
                this.label = '支付密码';
                this.placeholder = '请输入支付密码';
            }
            this.data.id = this.$route.query.id
        }
    }
</script>

<style lang="less">
    @import url(../../assets/css/manageCenter.less);
</style>