<template>
    <div id="withdraw_bankcard">
        <van-nav-bar title="提款至银行卡" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-row class="withdraw_bankcard_box">
                    <h5>{{ withdrawMoney }}<span> 元 共{{ bankTable.length }}张银行卡</span></h5>
                    <div class="bank fix">
                        <span class="float_l">银行卡</span>
                        <span class="float_r">差额：<h6>{{ difference }}</h6></span>
                    </div>

                    <ul>
                        <li v-for="(item,index) in bankTable" :key="index">
                            <div class="fix" v-show="item.bank_name == ''">
                                <span class="float_l"><img src="../../assets/img/icon-editBank.png"> 请编辑银行卡</span>
                                <span class="float_r">待填写</span>
                            </div>
                            <div class="active fix" v-show="item.bank_name != ''">
                                <span class="float_l">
                                    <img :src="item.img" width="24"> 
                                    {{ item.bank_name }}
                                    <b>****{{ item.card_number.substring(item.card_number,item.card_number.length-4) }}</b>
                                </span>
                                <span class="float_r">{{ item.account }}</span>
                            </div>
                            <div class="bot fix">
                                <span class="float_l">
                                    金额
                                    <b>￥</b>
                                    <input type="nuber" v-model="item.money" @input.delete="moneyKeyup($event,index)" @focus="moneyFocus(index)" />
                                </span>
                                <span class="float_r">
                                    <em @click="$router.push('/withdrawBankcardEdition?i=' + index)">修改</em>
                                    <van-icon name="delete-o" @click="delClick(index)" />
                                </span>
                            </div>
                        </li>
                    </ul>

                    <router-link class="add_bank" to="/withdrawBankcardEdition">
                        <van-icon name="add-o" />
                        添加银行卡
                    </router-link>
                </van-row>

                <van-row class="pay_password">
                    <van-field label="支付密码" placeholder="请输入支付密码" type="password" v-model="password" />
                    <span @click="$router.push('/personalInformation')">忘记密码</span>
                </van-row>

                <van-row class="btn">
                    <van-button type='primary' @click="submit">立即提款</van-button>
                </van-row>
            </div>
        </div>

        <!-- 发送验证码 -->
        <van-popup class="send_code" v-model="showSendCode">
            <h5>本次需要安全验证<van-icon name="cross" @click="showSendCode = false" /></h5>
            <div class="box">
                <p>请使用已绑定手机号<span>{{ mobile }}</span>做本次验证</p>
                <van-row class="input">
                    <input type="text" placeholder="请输入验证码" maxlength="4" v-model="code">
                    <span @click="sendCodeClick">{{ codeText }}</span>
                </van-row>
                <van-button type="primary" size="large" @click="withDrawClick">提交</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { SendSmsApi, checkPayPwdApi, withDrawApi } from '../../http/api.js'
    import bankArr from '../../assets/js/bankArr'
    export default {
        data() {
            return {
                // 银行表格
                bankTable: [],
                // 提款金额
                withdrawMoney: 0,
                // 差额
                difference: 0,
                keyupNum: 0,
                pre_difference: 0,
                // 支付密码
                password: "",
                // 获取手机号
                mobile: localStorage.getItem('mobile'),
                // 发送验证码
                showSendCode: false,
                codeText: '获取验证码',
                codeSet: null,
                key: "",
                code: "",
            }
        },
        methods: {
            // 输入金额获取事件
            moneyFocus (index) {
                this.keyupNum = this.bankTable[index].money == '' ? 0 : parseFloat(this.bankTable[index].money);

                var sumMoney = 0;
                for(var i = 0; i < this.bankTable.length; i++) {
                    sumMoney += this.bankTable[i].money == '' ? 0 : parseFloat(this.bankTable[i].money)
                    this.pre_difference = parseInt(this.withdrawMoney) - sumMoney
                }
            },
            // 输入金额事件
            moneyKeyup (event,index) {
                // 超过49999
                if(parseInt(this.bankTable[index].money) > 49999){
                    this.bankTable[index].money = 49999
                }

                var sumMoney = 0;
                for(var i = 0; i < this.bankTable.length; i++) {
                    sumMoney += this.bankTable[i].money == '' ? 0 : parseFloat(this.bankTable[i].money)
                    this.difference = (parseFloat(this.withdrawMoney) - sumMoney).toFixed(2);
                }
                
                if(event.inputType != 'deleteContentBackward'){ //否删除按钮
                    if(sumMoney > parseFloat(this.withdrawMoney)){
                        this.bankTable[index].money = this.keyupNum + parseFloat(this.pre_difference);
                        this.difference = 0;
                        if(this.difference < 0){
                            this.difference = this.pre_difference
                        }
                    }else{
                        this.keyupNum = parseFloat(this.bankTable[index].money);
                        this.pre_difference = this.difference
                    }
                }else{ //是删除按钮
                    this.keyupNum = this.bankTable[index].money == "" ? 0 : parseFloat(this.bankTable[index].money);
                    this.pre_difference = this.difference
                }

                var generateBankCardData = JSON.stringify(this.bankTable)
                localStorage.setItem('generateBankCardData',generateBankCardData)
            },
            // 删除
            delClick (index) {
                this.bankTable.splice(index,1);
                var generateBankCardData = JSON.stringify(this.bankTable);
                localStorage.setItem('generateBankCardData',generateBankCardData);

                if(this.bankTable.length > 0){
                    var num = 0;
                    for(var i = 0; i < this.bankTable.length; i++) {
                        num += this.bankTable[i].money == '' ? 0 : parseFloat(this.bankTable[i].money)
                        this.difference = (this.withdrawMoney - num).toFixed(2)
                    }
                }else{
                    this.difference = this.withdrawMoney
                }
            },
            // 提交
            submit () {
                var _this = this;
                var is_perfect = false;
                for(var i = 0; i < this.bankTable.length; i++){
                    if(this.bankTable[i].account == ""){
                        is_perfect = true
                    }else if(this.bankTable[i].money == ''){
                        is_perfect = true
                    }else{
                        is_perfect = false
                    }
                }
                
                if(is_perfect){
                    this.$toast({
                        message: '请完善银行卡信息或提款金额',
                        position: 'bottom',
                    });
                }else if(this.password == ''){
                    this.$toast({
                        message: '请输入支付密码',
                        position: 'bottom',
                    });
                }else if(this.password.length < 6){
                    this.$toast({
                        message: '支付密码为6位数字或者字母，请重新输入',
                        position: 'bottom',
                    });
                }else{
                    var data = {
                        pay_pwd: this.password
                    };
                    this.$loading.show();
                    checkPayPwdApi(data).then(res => {
                        _this.$loading.hide();
                        _this.showSendCode = true
                    }).catch(err => {
                        _this.$loading.hide();
                        _this.$toast({
                            message: err.meesge,
                            position: 'bottom',
                        });
                    })
                }
            },
            // 发送验证码
            sendCodeClick () {
                var _this = this;
                if(this.codeText == '获取验证码' || this.codeText == '重新获取'){
                    this.codeText = "发送中";
                    SendSmsApi().then(res => {
                        _this.key = res.data.key;
                        var cont = 90;
                        _this.codeText = cont + "s";
                        _this.codeSet = setInterval(function(){
                            cont --;
                            _this.codeText = cont + "s";
                            if(cont == 0){
                                clearInterval(_this.codeSet);
                                _this.codeText = '重新获取'
                            }
                        },1000)
                    }).catch(err => {
                        _this.codeText = "获取验证码";
                        _this.$toast({
                            message: err.meesge,
                            position: 'bottom',
                        });
                    })
                }
            },
            // 发起提款
            withDrawClick() {
                var _this = this;
                if(this.code == ''){
                    this.$toast({
                        message: '验证码不能为空',
                        position: 'bottom',
                    });
                }else if(this.key == ''){
                    this.$toast({
                        message: '请发送验证码',
                        position: 'bottom',
                    });
                }else{
                    var data = {
                        code: this.code,
                        key: this.key,
                        bank: localStorage.getItem('generateBankCardData'),
                        password: this.password
                    }
                    this.$loading.show();
                    withDrawApi(data).then(res => {
                        _this.$loading.hide();
                        _this.$toast({
                            message: res.data.message,
                            position: 'bottom',
                        });
                        _this.$router.go(-1);
                        localStorage.removeItem('generateBankCardData')
                    }).catch(err => {
                        _this.$loading.hide();
                        _this.$toast({
                            message: err.meesge,
                            position: 'bottom',
                        });
                    })
                }
            }
        },
        mounted () {
            var generateBankCardData = localStorage.getItem('generateBankCardData');
            this.bankTable = JSON.parse(generateBankCardData);
            this.withdrawMoney = localStorage.getItem('withdrawMoney');

            for(var i = 0; i < this.bankTable.length; i++) {
                for(var j = 0; j < bankArr.length; j++){
                    if(this.bankTable[i].bank_name == bankArr[j].text){
                        this.bankTable[i]['img'] = bankArr[j].img
                    }
                }
            }

            // 刷新后差额=提款总价-表格金额
            if(this.bankTable.length > 0){
                var num = 0;
                for(var i = 0; i < this.bankTable.length; i++) {
                    num += this.bankTable[i].money == '' ? 0 : parseFloat(this.bankTable[i].money)
                    this.difference = (this.withdrawMoney - num).toFixed(2)
                }
            }else{
                this.difference = this.withdrawMoney
            }
        },
        beforeDestroy() {
            clearInterval(this.codeSet);
        },
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/financialCenter.less);
</style>