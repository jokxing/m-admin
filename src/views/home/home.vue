<template>
    <div id="home">
        <div class="top">
            <div class="top_inner">
                <div class="head fix">
                    <van-icon class="head_i" name="manager" />
                    <p>晚上好！ {{ mainData.name }}</p>
                    <p v-if="mainData != ''">
                        <span class="float_l">代理余额 <em>￥{{ mainData.money }}</em></span>
                        <span class="float_r">礼金余额 <em>￥{{ mainData.cmoney.toFixed(2) }}</em></span>
                    </p>
                </div>
                <div class="circle fix">
                    <div class="circle_inner">
                        <van-circle 
                            v-model="currentRate" 
                            :rate="text" 
                            :speed="100" 
                            :text="text + '%'"
                            layer-color="#fff"
                            color="#FFC248"
                            stroke-width="50" />
                    </div>
                    <h6>比例</h6>
                </div>
                <van-row class="info">
                    <van-col span="6">
                        <p>{{ homeData.register_user }}</p>
                        <p>会员</p>
                    </van-col>
                    <van-col span="6">
                        <p>{{ homeData.valid_user }}</p>
                        <p>有效</p>
                    </van-col>
                    <van-col span="6">
                        <p>{{ homeData.user_num }}</p>
                        <p>人数</p>
                    </van-col>
                    <van-col span="6">
                        <p>{{ homeData.payout }}</p>
                        <p>收益</p>
                    </van-col>
                </van-row>
            </div>
        </div>

        <div class="notice" @click="$router.push('/notice')">
            <van-icon name="volume-o" />
            <marquee scrollamount="2">
                <span>{{ marqueeContent }}</span>
            </marquee>
        </div>

        <div class="main fix">
            <div class="tab">
                <ul>
                    <li v-for="(item, index) in tabs" :key="index" v-if="item.level.indexOf(level_id) != -1" :class="{ active: num == index }" @click="tabClick(index)">
                        <img :src=' num == index ? item.imgWhite : item.img'>
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
            <div class="right" ref="scollElement">
                <ul :class="listClass">
                    <li v-for="(item,index) in list" :key="item.val" v-if="item.level.indexOf(level_id) != -1" :style="'background-image: url(' + item.img + ')'" @click="goClick(item)">
                        {{ item.text }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- 下载进度 -->
        <van-popup v-model="showProgress" class="progress">
            <h6>下载中</h6>
            <van-progress :percentage="percentage" />
        </van-popup>
    </div>
</template>

<script>
    import { indexInfoApi, mainApi, marqueeApi } from '../../http/api.js'
    export default {
        data() {
            return {
                level_id: localStorage.getItem('level_id'),
                listClass: "list_4",
                currentRate: this.$store.state.indexInfo != '' ? this.$store.state.indexInfo.rate : 0,
                text: this.$store.state.indexInfo != '' ? this.$store.state.indexInfo.rate : 0,
                tabs: [
                    {
                        img: require('../../assets/img/home/icon-admin.png'),
                        imgWhite: require('../../assets/img/home/icon-admin-white.png'),
                        text: '管理中心',
                        level: ['1','2', '3']
                    },
                    {
                        img: require('../../assets/img/home/icon-record.png'),
                        imgWhite: require('../../assets/img/home/icon-record-white.png'),
                        text: '会员记录',
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/icon-finance.png'),
                        imgWhite: require('../../assets/img/home/icon-finance-white.png'),
                        text: '财务中心',
                        level: ['1','2','3']
                    },
                    {
                        img: require('../../assets/img/home/icon-reportform.png'),
                        imgWhite: require('../../assets/img/home/icon-reportform-white.png'),
                        text: '报表中心',
                        level: ['1','2','3']
                    },
                    {
                        img: require('../../assets/img/home/icon-extension.png'),
                        imgWhite: require('../../assets/img/home/icon-extension-white.png'),
                        text: '推广专区',
                        level: ['3']
                    }
                ],
                adminList: [
                    {
                        img: require('../../assets/img/home/admin_list1.png'),
                        url: '/memberManage',
                        text: '会员管理',
                        val: 1,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/admin_list2.png'),
                        url: '/memberTransferLine',
                        text: '会员转线申请',
                        val: 2,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/admin_list3.png'),
                        url: '/memberLogoutSearch',
                        text: '会员注销查询',
                        val: 3,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/admin_list4.png'),
                        url: '/memberLevelAdjustment',
                        text: '会员调级申请',
                        val: 4,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/admin_list1.png'),
                        url: '/agentSubordinate',
                        text: '下级管理',
                        val: 5,
                        level: ['1','2']
                    },
                ],
                recordList: [
                    {
                        img: require('../../assets/img/home/record_list2.png'),
                        url: '/despositWithdrawalRecord',
                        text: '存提款记录',
                        val: 7,
                        level: ['3']
                    },
                ],
                financeList: [
                    {
                        img: require('../../assets/img/home/finance_list1.png'),
                        url: '/withdrawCenter',
                        text: '提款专区',
                        val: 8,
                        level: ['1','2','3']
                    },
                    {
                        img: require('../../assets/img/home/finance_list2.png'),
                        url: '/memberDeposit',
                        text: '会员代存',
                        val: 9,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/finance_list3.png'),
                        url: '/jackpotGift',
                        text: '礼金赠送',
                        val: 10,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/finance_list2.png'),
                        url: '/agentFundflow',
                        text: '代存转账记录',
                        val: 11,
                        level: ['1','2']
                    },
                ],
                reportformList: [
                    {
                        img: require('../../assets/img/home/reportform_list2.png'),
                        url: '/commissionReport',
                        text: '财务报表',
                        val: 15,
                        level: ['1','2','3']
                    },
                    {
                        img: require('../../assets/img/home/reportform_list3.png'),
                        url: '/memberReport',
                        text: '会员报表',
                        val: 16,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/reportform_list5.png'),
                        url: '/inviteRewardReport',
                        text: '邀请有奖（会员）',
                        val: 17,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/reportform_list4.png'),
                        url: '/inviteProxyReport',
                        text: '代理邀请报表',
                        val: 18,
                        level: [ JSON.parse(localStorage.getItem('bill_wtd')) ? '3' : "" ]
                    },
                ],
                extensionList: [
                    {
                        img: require('../../assets/img/home/extension_list1.png'),
                        url: '/spreadUrl',
                        text: '会员推广网址',
                        val: 19,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/extension_list2.png'),
                        url: '/exclusiveDomain',
                        text: '专属域名',
                        val: 20,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/extension_list3.png'),
                        url: '/spreadProxyUrl',
                        text: '代理邀请推广',
                        val: 21,
                        level: ['3']
                    },
                    {
                        img: require('../../assets/img/home/extension_list4.png'),
                        url: '/spreadMaterial',
                        text: '推广素材',
                        val: 22,
                        level: [ JSON.parse(localStorage.getItem('bill_wtd')) ? '3' : "" ]
                    },
                ],
                list: [],
                num: this.$store.state.homeTab,
                // 首页初始化
                homeData: "",
                // 首页金额
                mainData: {
                    name: "",
                    money: 0,
                    cmoney: 0
                },
                // 公告
                marqueeContent: '',
                // 下载进度条
                showProgress: false,
                percentage: 0,
                // 获取上一个页面路由
                fromPath:""
            }
        },
        methods: {
            // 首页初始化
            indexInfoData () {
                var _this = this;
                if(this.$store.state.indexInfo == ''){
                    this.$loading.show();
                }else{
                    this.homeData = this.$store.state.indexInfo;
                    this.text = this.$store.state.indexInfo.rate
                }
                indexInfoApi().then(res => {
                    _this.$loading.hide();
                    _this.homeData = res.data.message;
                    _this.text = _this.homeData.rate;

                    _this.$store.commit('upIndexInfoData',res.data.message)
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
            mainInit() {
                var _this = this;
                if(this.$store.state.mainData != ''){
                    this.mainData.name = this.$store.state.mainData.name;
                    this.mainData.money = this.$store.state.mainData.money;
                    this.mainData.cmoney = this.$store.state.mainData.cmoney
                }
                mainApi().then(res => {
                    localStorage.setItem('mobile', res.data.message.mobile);
                    localStorage.setItem('money', res.data.message.money);
                    localStorage.setItem('cmoney', res.data.message.cmoney);
                    localStorage.setItem('has_pay_pwd', res.data.message.has_pay_pwd);
                    localStorage.setItem('bill_wtd', res.data.message.bill_wtd);
                    _this.$store.commit('upMainData',res.data.message)
                    _this.mainData = res.data.message;
                    
                    if(res.data.message.bill_wtd){
                        _this.reportformList[6].level = ["3"];
                        _this.extensionList[3].level = ["3"]
                    }
                }).catch(err => {

                })
            },
            // 公告
            marqueeData () {
                var _this = this;
                if(this.$store.state.marqueeContent != ''){
                    this.marqueeContent = this.$store.state.marqueeContent
                }else{
                    marqueeApi().then(res => {
                        for(var i = 0; i < res.data.message.length; i++){
                            _this.marqueeContent += res.data.message[i].title + ":" + res.data.message[i].content + " "
                        }
                        _this.$store.commit('upMarqueeContent',_this.marqueeContent)
                    }).catch(err => {
                        
                    })
                }
            },
            tabClick(index) {
                this.num = index;
                this.list = [];
                if(index == 0){
                    this.list = this.adminList;
                    this.listClass = "list_4"
                }else if(index == 1){
                    this.list = this.recordList;
                    this.listClass = "list_2"
                }else if(index == 2){
                    this.list = this.financeList;
                    this.listClass = 'list_3'
                }else if(index == 3){
                    this.list = this.reportformList;
                    this.listClass = "list_4"
                }else{
                    this.list = this.extensionList;
                    this.listClass = "list_4"
                }

                this.$refs.scollElement.scrollTop = 0;
                this.$store.commit('upHomeTab', index)
            },
            // 进去页面
            goClick(item){
                var bill_wtd = JSON.parse(localStorage.getItem('bill_wtd'))
                if(item.url == '/withdrawCenter' || item.url == '/commissionReport'){
                    if(!bill_wtd){
                        this.$toast({
                            message: '暂时不开放',
                            position: 'bottom',
                        });
                    }else{
                        this.$router.push(item.url)
                    }
                }else{
                    this.$router.push(item.url)
                }
            },
        },
        mounted () {
            if(this.$store.state.homeTab == 0){
                this.list = this.adminList;
                this.listClass = "list_4"
            }else if(this.$store.state.homeTab == 1){
                this.list = this.recordList;
                this.listClass = "list_2"
            }else if(this.$store.state.homeTab == 2){
                this.list = this.financeList;
                this.listClass = 'list_3'
            }else if(this.$store.state.homeTab == 3){
                this.list = this.reportformList;
                this.listClass = "list_4"
            }else{
                this.list = this.extensionList;
                this.listClass = "list_4"
            }
            this.indexInfoData();
            this.mainInit();
            this.marqueeData();
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.fromPath = from.path
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/home.less);
</style>