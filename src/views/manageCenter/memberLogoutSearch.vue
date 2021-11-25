<template>
    <div id="member_logout_search">
        <van-nav-bar title="会员注销查询" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-cell-group class="search">
                <van-field
                    :left-icon="leftIcon"
                    v-model="Name"
                    placeholder="输入会员账号"
                />
            </van-cell-group>

            <div class="inner">
                <van-button type="primary" @click="hanldQuery">查询</van-button>

                <div class="box">
                    <van-icon name="warning" class="red" v-show="showError" />
                    <van-icon name="checked" class="green" v-show="showSuccess" />
                    <img src="../../assets/img/memberLogoutSearch_error.png" v-if="message == ''">
                    <p v-else>{{ message }}</p>
                </div>

                <div class="requirement">
                    <h6>要求（分为两种）:</h6>
                    <ul>
                        <li>
                            <span>1</span>
                            内容1
                        </li>
                        <li>
                            <span>2</span>
                            内容2
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { checUserStatusApi } from '../../http/api'
    export default {
        data() {
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                Name: "",
                showSuccess: false,
                showError: false,
                message: ""
            }
        },
        methods: {
            checUserInit: function () {
                var _this = this;
                this.$loading.show()
                var data = {
                    Name: this.Name
                }
                checUserStatusApi(data).then(res => {
                    _this.$loading.hide()
                    _this.showSuccess = true;
                    _this.showError = false;
                    _this.message = res.data.message
                }).catch(err => {
                    _this.$loading.hide()
                    _this.showSuccess = false;
                    _this.showError = true;
                    _this.message = err.message
                })
            },
            // 查询
            hanldQuery: function () {
                if(this.Name == ''){
                    this.$toast({
                        message: '请输入会员账号',
                        position: 'bottom',
                    });
                }else{
                    this.checUserInit()
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/manageCenter.less);
</style>