<template>
    <div id="commissionReport_detail">
        <van-nav-bar title="实际盈亏" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="inner">
                <ul class="fix">
                    <li>
                        <span class="float_l">实际1</span>
                        <span class="float_r" :class="{ 'green': d.payout > 0, 'red': d.payout < 0 }">{{ d.payout }}</span>
                    </li>
                    <li>
                        <span class="float_l">实际2</span>
                        <span class="float_r">
                            <van-button type="primary" size="small" @click="showBonus =! showBonus">{{ showBonus ? '收起' : '查看详情' }}</van-button>
                            {{ (d.bonus_money + d.agent_bonus + d.user_agent).toFixed(2) }}
                        </span>
                    </li>

                    <div v-show="showBonus">
                        <li class="small">
                            <span class="float_l">实际2-3</span>
                            <span class="float_r">{{ d.bonus_money }}</span>
                        </li>
                        <li class="small">
                            <span class="float_l">实际2-4</span>
                            <span class="float_r">{{ d.agent_bonus }}</span>
                        </li>
                        <li class="small">
                            <span class="float_l">实际2-5</span>
                            <span class="float_r">{{ d.user_agent }}</span>
                        </li>
                    </div>

                    <li>
                        <span class="float_l">实际3</span>
                        <span class="float_r">{{ d.fee }}</span>
                    </li>
                    <li>
                        <span class="float_l">实际4</span>
                        <span class="float_r">{{ d.game_fee }}</span>
                    </li>
                    <li>
                        <span class="float_l">实际5</span>
                        <span class="float_r" :class="{ 'green': d.real_win_lost > 0, 'red': d.real_win_lost < 0 }">{{ d.real_win_lost }}</span>
                    </li>
                    <li>
                        <span class="float_l">实际6</span>
                        <span class="float_r">
                            <van-button type="primary" size="small" @click="showOther =! showOther">{{ showOther ? '收起' : '查看详情' }}</van-button>
                        </span>
                    </li>

                    <div v-show="showOther">
                        <li class="small">
                            <span class="float_l">实际6-1</span>
                            <span class="float_r">{{ d.beat_num }}</span>
                        </li>
                        <li class="small">
                            <span class="float_l">实际6-2</span>
                            <span class="float_r">{{ d.beat_money }}</span>
                        </li>
                        <li class="small">
                            <span class="float_l">实际6-3</span>
                            <span class="float_r">{{ d.valid_betamt }}</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showBonus: false,
                showOther: false,
                d: ""
            }
        },
        created () {
            if(this.$store.state.commissionDetail != ''){
                this.d = this.$store.state.commissionDetail.detail
            }else{
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/reportCenter.less);
</style>