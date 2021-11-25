<template>
    <div id="noticeDetail">
        <van-nav-bar title="消息" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <h5>{{ d.title }}</h5>
            <h6>{{ d.created_at }}</h6>
            <p>{{ d.content }}</p>
        </div>
    </div>
</template>

<script>
    import { noticeDetailApi } from '../../http/api.js'
    export default {
        data() {
            return {
                d:""
            };
        },
        methods: {
            noticeDetailData () {
                var _this = this;
                var data = {
                    id: this.$route.params.id
                }
                this.$loading.show();
                noticeDetailApi(data).then(res => {
                    _this.$loading.hide();
                    _this.d = res.data.message
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
        },
        mounted () {
            this.noticeDetailData()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/notice.less);
</style>