<template>
    <div>
        <van-nav-bar title="转账" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-form @submit="submit">
                    <van-field
                        name="加减"
                        label="加减"
                        placeholder="+"
                        readonly
                    />
                    <van-field
                        v-model="data.ja1"
                        name="金额"
                        label="金额"
                        placeholder="请输入金额"
                        :rules="[{ required: true, message: '请输入金额' }]"
                    />
                    <van-field
                        type="textarea"
                        v-model="data.remark1"
                        name="备注"
                        label="备注"
                        maxlength="200"
                        placeholder="请输入留言"
                        show-word-limit
                    />
                    <van-field
                        type="password"
                        v-model="data.pay_pwd"
                        name="支付密码"
                        label="支付密码"
                        placeholder="请输入支付密码"
                        :rules="[{ required: true, message: '请输入支付密码' }]"
                    />

                    <van-row class="manageCenter_btn">
                        <van-button type="primary" block>确认</van-button>
                    </van-row>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { agentSubordinateRechangeApi } from '../../http/api'
    export default {
        data() {
            return {
                data: {
                    id: "",
                    ja1: "",
                    remark1: "",
                    pay_pwd: ""
                },
            }
        },
        methods: {
            submit() {
                // var _this = this;
                // this.$loading.show()
                // agentSubordinateRechangeApi(_this.data).then(res => {
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
        },
        mounted () {
            this.data.id = this.$route.query.id
        }
    }
</script>

<style lang="less">
    @import url(../../assets/css/manageCenter.less);
</style>