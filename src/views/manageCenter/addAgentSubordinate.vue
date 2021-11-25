<template>
    <div id="addAgentSubordinate">
        <van-nav-bar :title="title" left-arrow @click-left="back"/>

        <div class="main">
            <div class="main_inner">
                <van-form @submit="submit">
                    <van-field
                        v-model="addData.code"
                        name="代理账号"
                        label="代理账号"
                        readonly
                    />
                    <van-field
                        v-if="$store.state.subordinate == ''"
                        v-model="addData.password"
                        name="密码"
                        label="密码"
                        placeholder="输入密码"
                        type="password"
                        maxlength="20"
                        :rules="[{ required: true, message: '输入密码' }]"
                    />
                    <van-field
                        v-model="addData.realname"
                        name="姓名"
                        label="姓名"
                        placeholder="请输入姓名"
                        :readonly="$store.state.subordinate != ''"
                        :rules="[{ required: true, message: '输入密码' }]"
                    />
                    <van-field
                        v-model="addData.mobile"
                        name="手机号"
                        label="手机号"
                        placeholder="请输入手机号"
                        maxlength="11"
                        :rules="[{ pattern, required: true, message: '请输入正确手机号码' }]"
                    />
                    <van-field
                        v-model="addData.qq"
                        name="QQ"
                        label="QQ"
                        placeholder="请输入QQ"
                        maxlength="10"
                        :rules="[{ required: true, message: '请输入QQ' }]"
                    />
                    <van-field
                        v-model="addData.email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="请输入邮箱"
                        :rules="[{ required: true, message: '请输入邮箱' }]"
                    />
                    <van-field
                        v-model="addData.remark"
                        rows="3"
                        autosize
                        label="留言"
                        type="textarea"
                        placeholder="请输入留言"
                        maxlength="200"
                        show-word-limit
                    />
                    <van-field
                        v-model="addData.otherc"
                        name="其他联系方式"
                        label="其他联系方式"
                        placeholder="请输入其他联系方式"
                    />
                    <van-row class="btn">
                        <van-button type="primary" block>确认</van-button>
                    </van-row>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { agentSubordinateMakeCodoApi, agentSubordinateAddApi, agentSubordinateUpdateApi } from '../../http/api'
    export default {
        data() {
            return {
                title: '新增下级代理',
                addData:{
                    code: "loading..",
                    password: "",
                    realname: "",
                    mobile: "",
                    qq: "",
                    email: "",
                    remark: "",
                    status: 1,
                    otherc: ""
                },
                pattern: /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,
            }
        },
        methods: {
            // 初始化
            addMakeCodeData () {
                var _this = this;
                this.$loading.show()
                agentSubordinateMakeCodoApi(_this.addData).then(res => {
                    _this.$loading.hide();
                    _this.addData.code = res.data.message.code
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
            // 确认
            submit() {
                // if(this.$store.state.subordinate != ''){
                //     this.editSubmit()
                // }else{
                //     this.addSubmit();
                // }
                // this.$loading.show();
            },
            // 新增下级-提交
            addSubmit () {
                var _this = this;
                agentSubordinateAddApi(_this.addData).then(res => {
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
            // 编辑下级-提交
            editSubmit (formName) {
                var _this = this;
                var data = {
                    id: this.addData.id,
                    mobile: this.addData.mobile,
                    qq: this.addData.qq,
                    email: this.addData.email,
                    remark: this.addData.remark,
                    otherc: this.addData.otherc
                }
                agentSubordinateUpdateApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: res.data.message,
                        position: 'bottom',
                    });
                    _this.back()
                }).catch(err => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: err.message,
                        position: 'bottom',
                    });
                })
            },
            // 返回
            back() {
                this.$router.go(-1);
                this.$store.commit('upSubordinate', '')
            }
        },
        mounted () {
            if(this.$store.state.subordinate != ''){
                this.title = '编辑下级代理';
                this.addData = this.$store.state.subordinate
            }else{
                this.addMakeCodeData();
            }
        }
    }
</script>

<style lang="less">
    #addAgentSubordinate{
        .btn{
            width: 90%;
            margin: 20px auto;
        }
    }
</style>