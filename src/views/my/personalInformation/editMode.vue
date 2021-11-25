<template>
    <div id="edit">
        <van-nav-bar title="请输入联系方式" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <ul>
                <li>
                    <span>联系方式</span>
                    <input type="text" readonly v-model="mode">
                </li>
                <li>
                    <span>联系号码</span>
                    <input type="text" placeholder="请输入联系号码" maxlength="20" v-model="data.value">
                </li>
            </ul>

            <van-button type="primary" block @click="submitEdit">确认</van-button>
        </div>
    </div>
</template>

<script>
    import { agentEditInfoApi } from '../../../http/api'
    export default {
        data() {
            return {
                mode: '',
                data: {
                    column: "",
                    value: ""
                }
            }
        }, 
        methods: {
            // 编辑-提交
            submitEdit () {
                var _this = this;
                if(this.value == ''){
                    this.$toast({
                        message: "请输入" + this.mode,
                        position: 'bottom',
                    });
                }else{
                    if(this.data.value.indexOf('*') != -1){
                        this.$router.go(-1)
                    }else{
                        this.$loading.show();
                        agentEditInfoApi(_this.data).then(res => {
                            _this.$loading.hide();
                            _this.$router.go(-1);
                            _this.$toast({
                                message: res.data.message,
                                position: 'bottom',
                            });
                        }).catch(err => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: err.message,
                                position: 'bottom',
                            });
                        })
                    }
                }
            },
        },
        mounted() {
            if(this.$route.path == '/editQQMode'){
                this.mode = 'QQ';
                this.data.column = "qq"
            }else if(this.$route.path == '/editmailMode'){
                this.mode = '邮箱';
                this.data.column = "email"
            }else{
                this.mode = '其他';
                this.data.column = "otherc"
            }
            this.data.value = this.$route.query.num
        },  
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/my.less);
</style>