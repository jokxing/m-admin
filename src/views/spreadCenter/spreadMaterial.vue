<template>
    <div id="spread_material">
        <van-nav-bar title="推广素材" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="7" @click="showType = true">
                        <div class="screen_box">{{ typeText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                    <van-col span="7" @click="showTitle = true">
                        <div class="screen_box"><span>{{ titleText }}</span><van-icon name="arrow-down" /></div>
                    </van-col>
                    <van-col span="7" @click="showSize = true">
                        <div class="screen_box">{{ sizeText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                </van-row>

                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="16">
                        <ul>
                            <li 
                                v-for="(item, index) in timeTabs" 
                                :key="index" 
                                :class="{ active: timeNum == index }"
                                @click="timeNum = index; type = item.type">{{ item.text }}</li>
                        </ul>
                    </van-col>
                    <van-col span="7">
                        <van-button type="primary" @click="generaAgentPopularizeData">查询</van-button>
                    </van-col>
                </van-row>

                <van-row class="list" v-for="(value,key) in list" :key="key">
                    <van-row v-for="(v,index) in list[key]" :key="index">
                        <van-image
                            width="100%"
                            :src="v.url"
                        />
                        <van-button type="primary" size="large" :icon="iconDownload" @click="downloadLocal(v.url)">下载到手机</van-button>
                    </van-row>
                </van-row>
            </div>
        </div>

        <!-- 类型 -->
        <van-popup v-model="showType" round position="bottom">
            <van-picker
                title="请选择类型"
                show-toolbar
                :columns="typeColumns"
                @cancel="showType = false"
                @confirm="onType"
            />
        </van-popup>

        <!-- 标题 -->
        <van-popup v-model="showTitle" round position="bottom">
            <van-picker
                title="请选择标题"
                show-toolbar
                :columns="titleColumns"
                @cancel="showType = false"
                @confirm="onTitle"
            />
        </van-popup>

        <!-- 尺寸 -->
        <van-popup v-model="showSize" round position="bottom">
            <van-picker
                title="请选择尺寸"
                show-toolbar
                :columns="sizeColumns"
                @cancel="showSize = false"
                @confirm="onSize"
            />
        </van-popup>

        <!-- 下载进度 -->
        <van-popup v-model="showProgress" class="progress">
            <h6>下载中</h6>
            <van-progress :percentage="percentage" />
        </van-popup>
    </div>
</template>

<script>
    import { generaAgentPopularizeApi } from '../../http/api'
    export default {
        data () {
            return {
                // 类型
                showType: false,
                typeText: '所有类型',
                typeColumns: [],
                // 标题
                showTitle: false,
                titleText: '所有标题',
                titleColumns: [],
                // 尺寸
                showSize: false,
                sizeText: '所有尺寸',
                sizeColumns: [],
                // 选择时间
                timeTabs: [
                    {
                        text: '全部',
                        type: '1'
                    },
                    {
                        text: '本月',
                        type: '2'
                    },
                    {
                        text: '近三月',
                        type: '3'
                    },
                    {
                        text: '半年内',
                        type: '4'
                    },
                ],
                timeNum: 0,
                // 下载图标
                iconDownload: require('../../assets/img/icon-download.svg'),
                // 初始化
                list: "",
                // 查询
                data: {
                    type: '1',
                    genre: "",
                    name: "",
                    size: ""
                },
                // 下载进度条
                showProgress: false,
                percentage: 0
            }
        },
        methods: {
            // 初始化
            generaAgentPopularizeData () {
                var _this = this;
                _this.$loading.show();
                generaAgentPopularizeApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.list = res.data.message.data;
                    for(var i = 0; i < res.data.message.genre.length; i++){
                        _this.typeColumns.push({
                            'id': res.data.message.genre[i].id, 
                            'text': res.data.message.genre[i].name
                        })
                    }
                    for(var i = 0; i < res.data.message.list.length; i++){
                        _this.titleColumns.push({
                            text: res.data.message.list[i]
                        })
                    }
                    for(var i = 0; i < res.data.message.size.length; i++){
                        _this.sizeColumns.push({
                            text: res.data.message.size[i]
                        })
                    }
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            onType (val) {
                this.showType = false;
                this.typeText = val.text;
                this.data.genre = val.id
            },
            onTitle (val) {
                this.showTitle = false;
                this.titleText = val.text
                this.data.name = val.text;
            },
            onSize (val) {
                this.showSize = false;
                this.sizeText = val.text;
                this.data.size = val.text
            },
            downloadLocal(url) {
                console.log(url)
                window.open(url)
            },
            onDeviceReady (url) {
                var _this = this;
                this.$loading.show();
                var fileTransfer = new FileTransfer();
                var uri = url;
                var str = url.split("/")
                var name = str[str.length-1]
                var fileURL =  cordova.file.externalApplicationStorageDirectory + name + ".png";

                fileTransfer.onprogress = function(e) {
                    if (e.lengthComputable) {
                        _this.$loading.hide();
                        _this.showProgress = true;
                        let progress = e.loaded / e.total;
                        // 显示下载进度
                        _this.percentage = (progress * 100).toFixed(2);
                    }
                };

                fileTransfer.download(
                    uri,
                    fileURL,
                    function(entry) {
                        _this.$toast.clear();
                        var openUrl = entry.toURL()
                        setTimeout(function(){
                            _this.showProgress = false,
                            cordova.plugins.fileOpener2.open(
                                openUrl,
                                'image/png',
                                {

                                    error : function(e){ alert('失败status:'+JSON.stringify(e)+ " 路径："+entry.toURL() )}, 
                                    success : function(){ } 

                                }
                            );
                            _this.$dialog.alert({
                                title: '提示',
                                message: "下载完成，请预览： \n" + entry.toURL(),
                                theme: 'round-button',
                            });
                        },1000)
                    },
                    function(error) {
                        var mes = "download error http_status: " + error.http_status + "\n download error target " + error.target + "\n download error code: " + error.code
                        _this.$dialog.alert({
                            title: '提示',
                            message: mes,
                            theme: 'round-button',
                        });
                    },
                    null,
                )
            },
        },
        mounted () {
            this.generaAgentPopularizeData()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/spreadCenter.less);
</style>