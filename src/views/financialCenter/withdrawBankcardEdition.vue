<template>
    <div id="add_bank">
        <van-nav-bar title="添加银行卡" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-cell-group v-if="bankTabNum == -1">
                <van-field label="持卡人" placeholder="请输入持卡人姓名" v-model="bankForm.account" />
                <van-field label="银行卡号" placeholder="请输入银行卡号" maxlength="19" v-model="bankForm.card_number" />
                <van-field 
                    label="开户银行" 
                    v-model="bankForm.bank_name"
                    placeholder="请选择开户银行" 
                    readonly 
                    right-icon="arrow-down" 
                    @click="showbank = true" />
                <van-field 
                    label="开户地址" 
                    v-model="bankAddressValue"
                    placeholder="请选择开户地址" 
                    readonly 
                    right-icon="arrow-down"
                    @click="showBankAddress = true" />
            </van-cell-group>
            <van-cell-group v-else>
                <van-field label="持卡人" v-model="bankForm.account" disabled />
                <van-field label="银行卡号" :placeholder="bankForm.card_number.substring(0,4) + '****' + bankForm.card_number.substring(bankForm.card_number,bankForm.card_number.length-4)" disabled />
                <van-field 
                    label="开户银行" 
                    v-model="bankForm.bank_name"
                    disabled 
                    right-icon="arrow-down" />
                <van-field 
                    label="开户地址" 
                    :placeholder="bankForm.card_address.province + ' ' + bankForm.card_address.city + ' ' + bankForm.card_address.district" 
                    disabled 
                    right-icon="arrow-down" />
            </van-cell-group>

            <van-row class="btn">
                <van-button type="primary" @click="addBankConfirm">确定</van-button>
            </van-row>

            <van-row class="my_bank">
                <h5>我的银行卡</h5>
                <div class="grey" v-show="bankCardList.length == 0">
                    <van-icon name="card" /> 
                    <p>暂无银行卡信息，记录最近10张银行卡信息</p>
                </div>
                <ul class="fix" v-show="bankCardList.length > 0">
                    <li :class="{ 'bor_active': bankTabNum == index }" v-for="(item,index) in bankCardList" :key="index" @click="bankTabClick(item,index)">
                        <div class="float_l">
                            <img :src="item.img">
                            <span>{{ item.account }}</span>
                        </div>
                        <div class="float_r">
                            <span>****{{ item.card_number.substring(item.card_number,item.card_number.length-4) }}</span>
                            <van-icon name="clear" @click.stop="deleteClick(item.id)" />
                        </div>
                    </li>
                </ul>
            </van-row>
        </div>

        <!-- 开户银行 -->
        <van-popup v-model="showbank" round position="bottom">
            <van-picker
                show-toolbar
                :columns="bankList"
                @cancel="showbank = false"
                @confirm="onBank"
            />
        </van-popup>

        <!-- 开户地址 -->
        <van-popup v-model="showBankAddress" round position="bottom">
            <van-area
                title="标题"
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="onFinish"
            />
        </van-popup>
    </div>
</template>

<script>
    import bankArr from '../../assets/js/bankArr'
    import areaList from '../../assets/js/area'
    import { BankCardListApi, AddBankCardApi, DelBankCardApi } from '../../http/api.js'
    export default {
        data() {
            return {
                bankCardList: [],
                // 选择开户银行
                showbank: false,
                bankList: bankArr,
                // 选择开户银行地址
                showBankAddress: false,
                bankAddressValue: "",
                areaList,
                // 银行卡tab
                bankTabNum: -1,
                // 银行卡表单
                bankForm: {
                    account: "",
                    bank_name: "",
                    card_number: "",
                    card_address: {
                        province: "",
                        city: "",
                        district: "",
                    }
                },
            }
        },
        methods: {
            // 初始化
            BankCardListData(){
                var _this = this;
                _this.$loading.show();
                BankCardListApi().then(res => {
                    _this.$loading.hide();
                    _this.bankCardList = res.data.message;
                    for(var i = 0; i < _this.bankCardList.length; i++){
                        for(var j = 0; j < bankArr.length; j++){
                            if(_this.bankCardList[i].bank_name == bankArr[j].text){
                                _this.bankCardList[i]['img'] = bankArr[j].img;
                            }
                        }
                    }
                }).catch(err => {
                    _this.$loading.hide();
                })
            },
            // 选择开户银行
            onBank(value) {
                this.bankForm.bank_name = value.text;
                this.showbank = false;
            },
            // 选择开户银行地址
            onFinish(value) {
                this.bankForm.card_address.province = value[0].name;
                this.bankForm.card_address.city = value[1].name;
                this.bankForm.card_address.district = value[2].name;
                this.showBankAddress = false;
                this.bankAddressValue = value[0].name + ' ' + value[1].name + ' ' + value[2].name
            },
            // 银行卡tab
            bankTabClick(item,index) {
                this.bankTabNum = index;
                this.bankForm = item;
            },
            // 删除银行卡
            deleteClick (id) {
                var _this = this;
                var data = {
                    id: id
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认删除该银行卡?',
                    confirmButtonColor: '#5c7dec'
                }).then(() => {
                    _this.$loading.show();
                    DelBankCardApi(data).then(res => {
                        _this.$loading.hide();
                        _this.$toast({
                            message: res.data.message,
                            position: 'bottom',
                        });
                        _this.BankCardListData()
                    }).catch(err => {
                        _this.$loading.hide();
                        _this.$toast({
                            message: err.meesge,
                            position: 'bottom',
                        });
                    })
                }).catch(() => {
                });
            },
            // 确认
            addBankConfirm() {
                var _this = this;
                if(this.bankForm.account == ""){
                    this.$toast({
                        message: '请填写持卡人姓名',
                        position: 'bottom',
                    });
                }else if(this.bankForm.card_number == ''){
                    this.$toast({
                        message: '银行卡卡号应为13-19位数字',
                        position: 'bottom',
                    });
                }else if(this.bankForm.bank_name == ""){
                    this.$toast({
                        message: '请选择开户银行',
                        position: 'bottom',
                    });
                }else if(this.bankForm.card_address.province == '' || this.bankForm.card_address.city == '' || this.bankForm.card_address.district == ''){
                    this.$toast({
                        message: '请选择开户行地址',
                        position: 'bottom',
                    });
                }else if (this.bankForm.account.length < 2){
                    this.$toast({
                        message: '请输入正确的姓名',
                        position: 'bottom',
                    });
                }else{
                    var index = -1
                    if(this.$route.query.i){
                        index = parseInt(this.$route.query.i)
                    }
                    var generateBankCardData = JSON.parse(localStorage.getItem('generateBankCardData'))
                    // 添加银行卡
                    if(this.bankTabNum == -1){
                        this.$loading.show();
                        var data = {
                            account: this.bankForm.account,
                            bank_name: this.bankForm.bank_name,
                            card_number: this.bankForm.card_number,
                            province: this.bankForm.card_address.province,
                            city: this.bankForm.card_address.city,
                            district: this.bankForm.card_address.district,
                        }
                        AddBankCardApi(data).then(res => {
                            _this.$loading.hide();

                            //修改
                            if(index != -1){
                                _this.bankForm['money'] = generateBankCardData[index].money;
                                _this.bankForm['bankId'] = res.data.id;
                                generateBankCardData[index] = _this.bankForm
                            }else{ //添加
                                _this.bankForm['money'] = '';
                                _this.bankForm['bankId'] = res.data.id;
                                generateBankCardData.push(_this.bankForm)
                            }
                            // 有修改表格对应的表单就更新localStorage
                            var l_generateBankCardData = JSON.stringify(generateBankCardData)
                            localStorage.setItem('generateBankCardData', l_generateBankCardData)

                            _this.$router.go(-1)
                        }).catch(err => {
                            _this.$loading.hide();
                            _this.$toast({
                                message: err.message,
                                position: 'bottom',
                            });
                        })
                    }else{ //选中银行卡
                        //修改
                        if(index != -1){
                            _this.bankForm['money'] = generateBankCardData[index].money;
                            generateBankCardData[index] = _this.bankForm
                        }else{ //添加
                            _this.bankForm['money'] = '';
                            generateBankCardData.push(_this.bankForm)
                        }
                        // 有修改表格对应的表单就更新localStorage
                        var l_generateBankCardData = JSON.stringify(generateBankCardData)
                        localStorage.setItem('generateBankCardData', l_generateBankCardData)
                        this.$router.go(-1)
                    }
                }
            }
        },
        mounted () {
            this.BankCardListData()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/financialCenter.less);
</style>