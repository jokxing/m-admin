<template>
    <div id="spread_proxy_url">
        <van-nav-bar title="代理链接" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-cell center title="长链接" :label="q.url">
                <template #right-icon>
                    <van-button type="primary" size="small" @click="doCopy(q.url)">复制</van-button>
                </template>
            </van-cell>
            <van-cell center title="防封短链（微信）" :label="q.wx">
                <template #right-icon>
                    <van-button type="primary" size="small" @click="regenerate('wx', q.wx)">重新生成</van-button>
                    <van-button type="primary" size="small" @click="doCopy(q.wx)">复制</van-button>
                </template>
            </van-cell>
            <van-cell center title="防封短链（QQ）" :label="q.qq">
                <template #right-icon>
                    <van-button type="primary" size="small" @click="regenerate('qq', q.qq)">重新生成</van-button>
                    <van-button type="primary" size="small" @click="doCopy(q.qq)">复制</van-button>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
    import { generaAgentRegImportApi,makeShortLinkApi } from '../../http/api'
    export default {
        data () {
            return {
                q: ""
            }
        },
        methods: {
            generaAgentRegImport() {
                var _this = this;
                this.$loading.show();
                generaAgentRegImportApi().then(res => {
                    _this.$loading.hide();
                    _this.q = res.data.message.link
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
            // 复制
            doCopy(url) {
                var _this = this;
                this.$copyText(url).then(function (e) {
                    _this.$toast({
                        message: '复制成功',
                        position: 'bottom',
                    });
                }, function (e) {
                    alert('copy_error:' + e)
                })
            },
            // 重新生成
            regenerate (type,url) {
                var _this = this;
                this.$loading.show();
                var data = {
                    url: url
                }
                makeShortLinkApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$toast({
                        message: '重新生成成功',
                        position: 'bottom',
                    });
                    if(type == 'wx'){
                        _this.q.wx = res.data.message
                    }else{
                        _this.q.qq = res.data.message
                    }
                }).catch(err => {
                    _this.$loading.hide()
                })
            }
        },
        mounted () {
            this.generaAgentRegImport()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/spreadCenter.less);
</style>