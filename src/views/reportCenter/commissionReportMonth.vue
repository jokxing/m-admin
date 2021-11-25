<template>
    <div id="commissionReport_detail">
        <van-nav-bar title="当月财务" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="inner">
                <ul class="fix">
                    <li>
                        <span class="float_l">实际盈亏</span>
                        <span class="float_r" :class="{ red: d.profit < 0, green: d.profit > 0}">{{ d.profit }}</span>
                    </li>
                    <li>
                        <span class="float_l">财务比例</span>
                        <span class="float_r">{{ d.rate }}</span>
                    </li>
                    <li>
                        <span class="float_l">上月结余</span>
                        <span class="float_r">{{ d.last_balance }}</span>
                    </li>
                    <li>
                        <span class="float_l">资金调整</span>
                        <span class="float_r"></span>
                    </li>
                    <li class="small">
                        <span class="float_l">人头奖励</span>
                        <span class="float_r">{{ d.valid_reward }}</span>
                    </li>
                    <li class="small">
                        <span class="float_l">额外奖励</span>
                        <span class="float_r">{{ d.other_reward }}</span>
                    </li>
                    <li class="small">
                        <span class="float_l">手工调整</span>
                        <span class="float_r">{{ d.correction }}</span>
                    </li>
                    <div v-if="level_id == 3 && bill_wtd">
                         <li>
                            <span class="float_l">代理邀请</span>
                            <span class="float_r"></span>
                        </li>
                        <li class="small">
                            <span class="float_l">人头奖励</span>
                            <span class="float_r">{{ d.invite_correction }}</span>
                        </li>
                        <li class="small">
                            <span class="float_l">手工调整</span>
                            <span class="float_r">{{ d.correction }}</span>
                        </li>
                    </div>
                   
                    <li>
                        <span class="float_l">会员代存</span>
                        <span class="float_r">{{ d.detail.transfer_user }}</span>
                    </li>
                    <li>
                        <span class="float_l" :class="{ red: d.money < 0, green: d.money > 0}">当月财务</span>
                        <span class="float_r">{{ d.money }}</span>
                    </li>
                    <li>
                        <span class="float_l">本月结余</span>
                        <span class="float_r">{{ d.leave_money }}</span>
                    </li>
                    <li>
                        <span class="float_l">发放时间</span>
                        <span class="float_r">{{ d.created_at }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                d: {
                    detail: {}
                },
                level_id: localStorage.getItem('level_id'),
                bill_wtd: localStorage.getItem('bill_wtd')
            }
        },
        created () {
            if(this.$store.state.commissionDetail != ''){
                this.d = this.$store.state.commissionDetail
            }else{
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/reportCenter.less);
</style>