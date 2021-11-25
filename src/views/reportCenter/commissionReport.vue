<template>
    <div id="commission_report">
        <van-nav-bar title="财务报表" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <div class="inner">
                    <van-row v-for="(item,index) in q" :key="index">
                        <h5>{{ item.date_str }}</h5>
                        <ul class="fix">
                            <li>
                                <h6>
                                    <img src="../../assets/img/reportCenter/icon-commission.svg">
                                    当月财务
                                </h6>
                                <p>{{ item.money }}</p>
                                <van-button round size="mini" @click="monthlyCommissionDetail(item)">查看详情</van-button>
                            </li>
                            <li>
                                <h6>
                                    <img src="../../assets/img/reportCenter/icon-user.svg">
                                    活跃用户
                                </h6>
                                <p>{{ item.valid }}</p>
                            </li>
                            <li>
                                <h6>
                                    <img src="../../assets/img/reportCenter/icon-profitLoss.svg">
                                    实际盈亏
                                </h6>
                                <p>{{ item.profit }}</p>
                                <van-button round size="mini" @click="reportWinLoseDetail(item)">查看详情</van-button>
                            </li>
                            <li>
                                <h6>
                                    <img src="../../assets/img/reportCenter/icon-proportion.svg">
                                    财务比例
                                </h6>
                                <p>{{ item.rate }}</p>
                            </li>
                        </ul>
                    </van-row>
                </div>

                <van-row class="rule">
                    <ul>
                        <li>
                            <span>1</span>
                            规则1
                            <br>
                            内容1
                        </li>
                        <li>
                            <span>2</span>
                            内容2
                        </li>
                    </ul>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { commissionReportApi } from '../../http/api'
    export default {
        data () {
            return {
                q: ''
            }
        },
        methods: {
            commissionReport() {
                var _this = this;
                this.$loading.show();
                commissionReportApi().then(res => {
                    _this.$loading.hide();
                    _this.q = res.data.message
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 当月财务查看详情
            monthlyCommissionDetail(item){
                this.$store.commit('upCommissionDetail', item)
                this.$router.push('/commissionReportMonth');
            },
            // 实际盈亏查看详情
            reportWinLoseDetail(item) {
                this.$store.commit('upCommissionDetail', item)
                this.$router.push('/commissionReportWinLose')
            }
        },
        mounted () {
            this.commissionReport()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/reportCenter.less);
</style>