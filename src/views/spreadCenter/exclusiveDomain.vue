<template>
    <div id="spread_url">
        <van-nav-bar title="专属域名" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-row class="spread_url_box" v-for="(item,index) in me.link" :key="index">
                    <img src="../../assets/img/spreadCenter/me1.png" v-if="index == 0">
                    <img src="../../assets/img/spreadCenter/me2.png" v-if="index == 1">
                    <img src="../../assets/img/spreadCenter/me1.png" v-if="index == 2">
                    <img src="../../assets/img/spreadCenter/me2.png" v-if="index == 3">
                    <p>{{ item }}</p>
                    <van-button 
                        color="#9B9B9B" 
                        plain 
                        size="small" 
                        @click="onQrcode(item)">二维码</van-button>

                    <van-button 
                        type="primary" 
                        size="small" 
                        @click="onCopy(item)">复制</van-button>
                </van-row>
            </div>
        </div>

        <!-- 下载二维码 -->
        <van-popup class="qrcode_popup" :close-on-click-overlay='false' v-model="showQrcodePopup">
            <h5>下载二维码<van-icon name="cross" @click="hideQrcode" /></h5>
            <div class="content">
                <div id="qrcode" ref="qrcode"></div>
                <van-button type="primary" size="large" @click="downloadLocal"><van-icon name="back-top" />下载到手机</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import html2canvas from "html2canvas";
    import { ganeraAgentImportApi, makeShortLinkApi } from '../../http/api'
    export default {
        data() {
            return {
                // 初始化
                me: [],
                // 下载二维码
                showQrcodePopup: false,
                qrcodeP: null
            }
        },
        methods: {
            // 初始化
            ganeraAgentImportData () {
                var _this = this;
                if(this.$store.state.spreadUrlData != ''){
                    this.me = this.$store.state.spreadUrlData.me;
                }else{
                    this.$loading.show()
                    ganeraAgentImportApi().then(res => {
                        _this.$loading.hide();
                        _this.me = res.data.message.me;
                    }).catch(err => {
                        _this.$loading.hide()
                    })
                }
            },
            // 二维码弹出层-选中事件
            onQrcode (item) {
                var _this = this;
                this.showQrcode = false;
                this.showQrcodePopup = true;
                setTimeout(function(){
                    _this.qrcodeP = new QRCode(_this.$refs.qrcode, {
                        text: item,
                        width: 200,
                        height: 200,
                        correctLevel : QRCode.CorrectLevel.H
                    });
                },100)
            },
            // 关闭二维码弹出层
            hideQrcode() {
                var _this = this;
                this.showQrcodePopup = false; 
                setTimeout(function(){
                    _this.$refs.qrcode.innerHTML = ''
                },300)
            },
            // 二维码下载到本地
            downloadLocal() {
                var dragContainer = document.getElementById("qrcode");
                let opts = {
                    useCORS: true,
                    scale: 1
                };
                html2canvas(dragContainer,opts).then((canvas) => {
                    var url = canvas.toDataURL('image/png');    
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = "下载";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            },
            // 复制弹出层-选中事件
            onCopy (item) {
                var _this = this;
                this.showCopy = false;
                this.$copyText(item).then(function (e) {
                    _this.$dialog.alert({
                        title: '复制成功',
                        message: '已帮您复制长链接\n' + item,
                        confirmButtonColor: "#5c7dec",
                        confirmButtonText: '我知道了',
                    })
                }, function (e) {
                    alert('copy_error:' + e)
                })
            },
        },
        mounted () {
            this.ganeraAgentImportData();
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/spreadCenter.less);
</style>