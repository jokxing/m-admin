<template>
    <div id="withdrawCenter">
        <van-nav-bar 
            title="提款专区" 
            right-text="提款记录"
            @click-right="$router.push('/withdrawRecord')"
            />

        <div class="main">
            <van-row class="total_assets">
                <h6>总资产(元)</h6>
                <h5 v-if="data.block != 'loading..'">{{ data.block + data.balance }}</h5>
                <h5 v-else>loading..</h5>

                <van-row>
                    <ul>
                        <li>
                            <p>{{ data.block }}</p>
                            <h6>钱包（不可用）</h6>
                        </li>
                        <li>
                            <p>{{ data.balance }}</p>
                            <h6>钱包（可用）</h6>
                        </li>
                    </ul>
                </van-row>
            </van-row>

            <van-row class="withdraw_box choice_withdraw_type">
                <p>选择提现到</p>
                <ul>
                    <li class="active">
                        <img src="../../assets/img/icon-bank.png">
                        <p>银行卡</p>
                        <span><van-icon name="success" /></span>
                    </li>
                </ul>
            </van-row>

            <van-row class="withdraw_box withdraw_money">
                <p>提款金额</p>
                <van-row class="input">
                    <span>￥</span>
                    <van-field v-model="money" placeholder="请输入提款金额" @keyup="moneyKeyup" />
                </van-row>
                <p>提示：单次最高提款200,000.00元，今天最多还可提出 2,000,000.00 元</p>
            </van-row>

            <van-row class="withdraw_box">
                <van-button type="primary" @click="nextClick">下一步</van-button>
            </van-row>
        </div>
    </div>
</template>

<script>
    import { DrawMoneyInfoApi } from '../../http/api.js'
    export default {
        data () {
            return {
                data: {
                    balance: "loading..",
                    block: "loading..",
                },
                money: ""
            }
        },
        methods: {
            // 初始化
            DrawMoneyInfoData () {
                var _this = this;
                DrawMoneyInfoApi().then(res => {
                    _this.data = res.data.message;
                }).catch(err => {

                })
            },
            // 金额输入事件
            moneyKeyup () {
                if(parseInt(this.money) > 200000){
                    this.money = 200000;
                    this.$toast({
                        message: '单次最高提款200,000.00元',
                        position: 'bottom',
                    });
                }

                if(parseInt(this.balance) < parseInt(this.money)){
                    this.money = this.balance
                }
            },
            nextClick () {
                if(parseInt(this.money) < 100 || this.money == ''){
                    this.$toast({
                        message: '最低提款金额为100，请重新输入',
                        position: 'bottom',
                    });
                }else{
                    var money = parseInt(this.money);
                    var sum = (money / 10000) / 3 + 1;
                    var num = parseInt(sum);

                    var bankData = [];
                    
                    if(num > 1){
                        var max = money / num;
                        var min = max / 1.2;
                        var aryRet = [];
                        var iAcc = 0;
                        for(var i = 0; i < (num - 1); i++){
                            var iTmp = Math.floor(Math.random() * (max-min+1)+min);
                            aryRet.push(iTmp);
                            iAcc += iTmp
                            console.log(iAcc)
                        }
                        aryRet.push(money-iAcc)

                        for(var i = 0; i < aryRet.length; i++){
                            bankData.push({
                                card_number: "",
                                bank_name: "",
                                money: aryRet[i],
                                account: ""
                            })
                        }
                    }else{
                        bankData.push({
                            card_number: "",
                            bank_name: "",
                            money: money,
                            account: ""
                        })
                    }
                    // 银行列表赋值金额并保存localstorage
                    var banks = JSON.stringify(bankData)
                    localStorage.setItem("generateBankCardData",banks)
                    // 要提款的金额保存localstorage
                    localStorage.setItem("withdrawMoney", this.money)

                    this.$dialog.alert({
                        title: '温馨提示',
                        message: '单张卡最高提款49999，系统将自动生成' + num + '笔订单',
                        theme: 'round-button',
                    }).then(() => {
                        this.$router.push('/withdrawBankcard')
                    });
                }
            }
        },
        mounted () {
            var _this = this;
            var has_pay_pwd = localStorage.getItem('has_pay_pwd')
            if(has_pay_pwd == 'true'){
                this.DrawMoneyInfoData()
            }else{
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '为了您的资金安全，请先设置支付密码',
                    confirmButtonText: '去设置',
                    confirmButtonColor: '#5c7dec'
                }).then(() => {
                    _this.$router.push('/personalInformation')
                }).catch(() => {
                    _this.$router.go(-1)
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/financialCenter.less);
</style>