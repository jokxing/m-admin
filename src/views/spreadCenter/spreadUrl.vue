<template>
    <div id="spread_url">
        <van-nav-bar title="会员推广网址" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-row class="spread_url_box" v-for="(item,index) in list" :key="index">
                    <img :src="require('../../assets/img/spreadCenter/' + item.img)">
                    <p>{{ item.link.url }}</p>
                    <van-button 
                        color="#9B9B9B" 
                        plain 
                        size="small" 
                        icon="arrow-down" 
                        icon-position="right"
                        @click="hanldQrcode(item.link)">二维码</van-button>

                    <van-button 
                        type="primary" 
                        size="small" 
                        icon="arrow-down" 
                        icon-position="right"
                        @click="hanldCopy(item.link)">复制</van-button>
                </van-row>
            </div>
        </div>

        <!-- 二维码弹出层 -->
        <van-popup v-model="showQrcode" position="bottom">
            <ul class="qrcode_list fix">
                <li v-for="(item,index) in qrcodeColumns" :key="index" @click="onQrcode(item)">
                    {{ item.text }}
                </li>
            </ul>
        </van-popup>

        <!-- 复制弹出层 -->
        <van-popup v-model="showCopy" position="bottom">
            <ul class="qrcode_list fix">
                <li v-for="(item,index) in copyColumns" :key="index" @click="onCopy(item)">
                    {{ item.text }}
                </li>
            </ul>
        </van-popup>

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
                // 二维码弹出层
                showQrcode: false,
                qrcodeColumns: [
                    {
                        text: '防封短链二维码（微信）',
                        url: ''
                    },
                    {
                        text: '防封短链二维码（QQ）',
                        url: ''
                    },
                    {
                        text: '长链接二维码',
                        url: ''
                    },
                ],
                // 复制弹出层
                showCopy: false,
                copyColumns: [
                    {
                        text: '防封短链（微信）',
                        url: '',
                    },
                    {
                        text: '防封短链（QQ）',
                        url: ''
                    },
                    {
                        text: '长链接',
                        url: ''
                    },
                ],
                // 初始化
                list: [],
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
                    var res = this.$store.state.spreadUrlData;
                    Object.keys(res).forEach(function(j,k){
                        for(var i = 0; i < res[j].length; i++){
                            _this.list.push(res[j][i])
                        }
                    })
                }else{
                    this.$loading.show()
                    ganeraAgentImportApi().then(res => {
                        _this.$loading.hide();
                        var res = res.data.message;
                        Object.keys(res).forEach(function(j,k){
                            for(var i = 0; i < res[j].length; i++){
                                _this.list.push(res[j][i])
                            }
                        })
                        _this.$store.commit('upSpreadUrlData', res)
                    }).catch(err => {
                        _this.$loading.hide()
                    })
                }
            },
            // 二维码显示弹出层
            hanldQrcode(link) {
                this.showQrcode = true;
                this.qrcodeColumns[0].url = link.wx;
                this.qrcodeColumns[1].url = link.qq;
                this.qrcodeColumns[2].url = link.url;
            },
            // 复制显示弹出层
            hanldCopy(link) {
                this.showCopy = true;
                this.copyColumns[0].url = link.wx;
                this.copyColumns[1].url = link.qq;
                this.copyColumns[2].url = link.url;
            },
            // 二维码弹出层-选中事件
            onQrcode (item) {
                var _this = this;
                this.showQrcode = false;
                this.showQrcodePopup = true;
                setTimeout(function(){
                    _this.qrcodeP = new QRCode(_this.$refs.qrcode, {
                        text: item.url,
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
                this.$copyText(item.url).then(function (e) {
                    if(item.text == '长链接'){
                        _this.$dialog.alert({
                            title: '复制成功',
                            message: '已帮您复制' + item.text + '\n' + item.url,
                            confirmButtonColor: "#5c7dec",
                            confirmButtonText: '我知道了',
                        })
                    }else{
                        _this.$dialog.confirm({
                            title: '复制成功',
                            message: '已帮您复制' + item.text + '\n' + item.url,
                            confirmButtonColor: "#5c7dec",
                            confirmButtonText: '我知道了',
                            cancelButtonText: '重新生成'
                        }).then(() => {
                        }).catch(() => {
                            _this.regenerate(item)
                        });
                    }
                }, function (e) {
                    alert('copy_error:' + e)
                })
            },
            // 重新生成
            regenerate (item) {
                var _this = this;
                this.$loading.show();
                var data = {
                    url: item.url
                }
                makeShortLinkApi(data).then(res => {
                    _this.$loading.hide();
                    _this.$copyText(res.data.message).then(function (e) {
                        _this.$dialog.alert({
                            title: '重新生成复制成功',
                            message: '已帮您重新生成并复制' + item.text + '\n' + res.data.message,
                            confirmButtonColor: "#5c7dec",
                            confirmButtonText: '我知道了',
                        })
                    }, function (e) {
                        alert('copy_error:' + e)
                    })
                }).catch(err => {
                    _this.$loading.hide()
                })
            }
        },
        mounted () {
            this.ganeraAgentImportData();
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/spreadCenter.less);
</style>