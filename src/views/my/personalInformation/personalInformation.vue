<template>
    <div id="personal_information">
        <van-nav-bar title="个人资料" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <ul>
                <li>
                    <div class="float_l">姓名</div>
                    <div class="float_r">{{ q.realname }}</div>
                </li>
                <li>
                    <div class="float_l">账号</div>
                    <div class="float_r">{{ q.code }}</div>
                </li>
                <li>
                    <div class="float_l">登录密码</div>
                    <div class="float_r">
                        <span @click="$router.push('/editPassword')">编辑</span>
                        <span @click="$router.push('/resetPassword')">重置</span>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <div class="float_l">手机号</div>
                    <div class="float_r">{{ q.mobile }}</div>
                </li>
                <li>
                    <div class="float_l">支付密码</div>
                    <div class="float_r">
                        <span @click="$router.push('/editPayPassword')">编辑</span>
                        <span @click="$router.push('/resetPayPassword')">重置</span>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <div class="float_l">QQ号码<span>{{ q.qq }}</span></div>
                    <div class="float_r" @click="$router.push('/editQQMode?num=' + q.qq)">
                        <img src="../../../assets/img/my/icon-edit.png">
                        <span>编辑</span>
                    </div>
                </li>
                <li>
                    <div class="float_l">邮箱<span>{{ q.email }}</span></div>
                    <div class="float_r" @click="$router.push('/editmailMode?num=' + q.email)">
                        <img src="../../../assets/img/my/icon-edit.png">
                        <span>编辑</span>
                    </div>
                </li>
                <li>
                    <div class="float_l">其他联系<span>{{ q.otherc }}</span></div>
                    <div class="float_r" @click="$router.push('/editOtherMode?num=' + q.email)">
                        <img src="../../../assets/img/my/icon-edit.png">
                        <span>编辑</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { agentBaseInfoApi } from '../../../http/api'
    export default {
        data () {
            return {
                q: ""
            }
        },
        methods: {
            // 初始化
            agentBaseInfoData () {
                var _this = this;
                this.$loading.show()
                agentBaseInfoApi().then(res => {
                    _this.$loading.hide()
                    _this.q = res.data.message;
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
        },
        mounted () {
            this.agentBaseInfoData()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/my.less);
</style>