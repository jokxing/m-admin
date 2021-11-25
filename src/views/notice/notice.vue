<template>
    <div id="notice">
        <van-nav-bar title="公告专区" left-arrow @click-left="back"/>

        <div class="main">
            <van-tabs v-model="activeName" title-active-color="#5C7DEC" color="#5C7DEC" @click="onClick">
                <van-tab v-for="(item,index) in tabs" :title="item" :name="item" :key="index">
                    <div class="list" v-show="q != ''">
                        <ul>
                            <li v-for="(v, i) in q" :key="i" @click="goNoticeDetail(v.id)">
                                <p>{{ v.title }}</p>
                                <span>{{ v.created_at }}</span>
                            </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>

            <div class="no_data" v-show="q == ''">
                <img src="../../assets/img/no_data.png">
                <p>还没有任何公告内容</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { noticeApi } from '../../http/api.js'
    export default {
        data() {
            return {
                activeName: "科比公告",
                tabs: ['科比公告','会员讯息','乔丹公告','麦迪公告','小卡公告'],
                q:""
            };
        },
        methods: {
            // 初始化
            noticeInit () {
                var _this = this;
                var data = {
                    type: this.activeName
                }
                this.$loading.show();
                noticeApi(data).then(res => {
                    _this.$loading.hide();
                    _this.q = res.data.message
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
            onClick(name, title) {
                this.activeName = title;
                this.noticeInit();
                this.$store.commit('upNoticeType', title)
            },
            goNoticeDetail(id) {
                this.$router.push('/noticeDetail/' + id)
            },
            // 返回
            back () {
                this.$router.go(-1);
                this.$store.commit('upNoticeType', '')
            }
        },
        mounted () {
            if(this.$store.state.noticeType != ''){
                this.activeName = this.$store.state.noticeType
            }
            
            this.noticeInit()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/notice.less);
</style>