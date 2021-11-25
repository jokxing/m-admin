<template>
    <div id="deposit_gift_page">
        <van-nav-bar 
            :title="$route.path == '/memberDeposit' ? '会员代存' : '礼金赠送'" 
            left-arrow 
            :right-text="$route.path == '/memberDeposit' ? '代存记录' : '礼金记录'"
            @click-left="$router.go(-1)"
            @click-right="onClickRight"/>

        <div class="main">
            <van-row class="wallet">
                <p v-if="$route.path == '/memberDeposit'">代存钱包（元）</p>
                <p v-else>礼金钱包（元）</p>
                <h4>{{ money }}</h4>
            </van-row>

            <van-row class="form">
                <van-row class="member_account" v-if="data.member_name == ''">
                    <van-icon name="warning-o" />
                    请从 <router-link to="/memberManage">会员管理</router-link> 输入会员帐号
                </van-row>
                <van-row class="member_account" v-else>
                    <p>会员帐号<span>{{ data.member_name }}</span></p>
                </van-row>

                <van-row class="money">
                    <p v-if="$route.path == '/memberDeposit'">代存金额</p>
                    <p v-else>礼金金额</p>
                    <div class="input_money">
                        <span>￥</span>
                        <input type="text" placeholder="请输入代存金额" v-model="data.amount" @keyup="num = -1">
                    </div>
                </van-row>

                <van-row class="choice_money">
                    <ul>
                        <li 
                            v-for="(item,index) in choiceMoney" 
                            :key="index"
                            :class="{ active: num == index }"
                            @click="moneyTab(item,index)">
                            {{ item }}
                            <span v-if="num == index"><van-icon name="success" /></span>
                        </li>
                    </ul>
                </van-row>
            </van-row>

            <van-row class="form">
                <van-field
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="20"
                    placeholder="请填写备注说明"
                    show-word-limit
                    v-model="data.remark"
                />
            </van-row>

            <van-row class="pay_password">
                <van-field type="password" label="支付密码" placeholder="请输入支付密码" v-model="data.paypassword" />
                <span @click="$router.push('/personalInformation')">忘记密码</span>
            </van-row>

            <van-row class="btn">
                <van-button type='primary' @click="submit">确认{{ $route.path == '/memberDeposit' ? '代存' : '礼金' }}</van-button>
            </van-row>
        </div>
    </div>
</template>

<script>
    import { agentDepositApi,  agentBonusApi } from '../../http/api'
    export default {
        data() {
            return {
                money: 0,
                choiceMoney: ['18','50','100','200','500'],
                num: -1,
                // 提交数据
                data: {
                    member_name: "",
                    amount: "",
                    remark: "",
                    paypassword: ""
                },
            }
        },
        methods: {
            onClickRight() {
                if(this.$route.path == '/memberDeposit'){
                    this.$router.push('/memberDepositRecord')
                }else{
                    this.$router.push('/jackpotGiftRecord')
                }
            },
            // 选择金额
            moneyTab (item,index) {
                this.num = index;
                this.data.amount = item  
            },
            // 提交
            submit () {
                var _this = this;
                if(this.data.member_name == ''){
                    this.$toast({
                        message: '请从会员管理输入账号进行处理',
                        position: 'bottom',
                    });
                }else if(this.data.amount == ''){
                    this.$toast({
                        message: '存款金额不能为空',
                        position: 'bottom',
                    });
                }else if(this.data.paypassword == ""){
                    this.$toast({
                        message: '支付密码不能为空',
                        position: 'bottom',
                    });
                }else{
                    this.$loading.show()
                    if(this.$route.path == '/memberDeposit'){
                        agentDepositApi(_this.data).then(res => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: res.data.message,
                                position: 'bottom',
                            });
                            _this.$router.push('/despositWithdrawalRecord')
                        }).catch(err => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: err.message,
                                position: 'bottom',
                            });
                        })
                    }else{
                        agentBonusApi(_this.data).then(res => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: res.data.message,
                                position: 'bottom',
                            });
                            _this.$router.push('/despositWithdrawalRecord')
                        }).catch(err => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: err.message,
                                position: 'bottom',
                            });
                        })
                    }
                }
            }
        },
        mounted () {
            if(this.$route.path == '/memberDeposit'){
                this.money = localStorage.getItem('money')
            }else{
                this.money = localStorage.getItem('cmoney')
            }

            if(this.$route.query.name){
                this.data.member_name = this.$route.query.name
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/financialCenter.less);
</style>