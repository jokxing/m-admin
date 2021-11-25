<template>
    <div>
        <van-nav-bar title="下级管理" left-arrow right-text="新增下级" @click-left="$router.go(-1)" @click-right="$router.push('/addAgentSubordinate')"/>

        <div class="main" style="padding-top: 40px">
            <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'下级记录'" :isTableLeft="false" :tdSlot="true">
                <tr class="tbody-content" v-for="(item,index) in tableBody">
                    <td class="first-col clearfix">{{ item.id }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.realname }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.cmoney }}</td>
                    <td :class="{ red: item.status_text == '锁定', green: item.status_text == '启动' }">{{ item.status_text }}</td>
                    <td>
                        <span><van-icon name="add-o" class="add" @click="showOther = true; otherData = item" /></span>
                    </td>
                    <td class="operation">
                        <span class="primary_color" @click="statusUpdate(item)">{{ item.status_text == '启动' ? '锁定' : '启动'}}</span>
                        <span class="primary_color" @click="edit(item)">编辑</span>
                        <span class="primary_color" @click="$router.push('/subordinateResetPwd?type=loginPwd&id=' + item.id)">重置登陆密码</span>
                        <span class="primary_color" @click="$router.push('/subordinateResetPwd?type=payPwd&id=' + item.id)">重置支付密码</span>
                        <span class="primary_color" @click="transferd(item)">转账</span>
                    </td>
                </tr>
            </tableLocked>
        </div>

        <!-- 其它-弹窗 -->
        <van-popup class="report_center_popup" v-model="showOther">
            <h5>其它</h5>
            <van-row class="content">
                <ul class="fix">
                    <li>
                        会员总数
                        <span class="float_r">{{ otherData.user_num }}</span>
                    </li>
                    <li>
                        注册会员（本月）
                        <span class="float_r">{{ otherData.user_register_num }}</span>
                    </li>
                    <li>
                        有效会员（本月）
                        <span class="float_r">{{ otherData.user_valid_num }}</span>
                    </li>
                    <li>
                        活跃会员（本月）
                        <span class="float_r">{{ otherData.user_active_num }}</span>
                    </li>
                    <li>
                        注册时间
                        <span class="float_r">{{ otherData.created_at }}</span>
                    </li>
                    <li>
                        注册ip
                        <span class="float_r">{{ otherData.created_ip }}</span>
                    </li>
                    <li>
                        登陆时间
                        <span class="float_r">{{ otherData.login_at }}</span>
                    </li>
                    <li>
                        登陆ip
                        <span class="float_r">{{ otherData.login_ip }}</span>
                    </li>
                    <li>
                        备注
                        <span class="float_r">{{ otherData.remark }}</span>
                    </li>
                </ul>
                <van-button type="primary" size="large" @click="showOther = false">确认</van-button>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
    import tableLocked from '../../components/tableLocked.vue'
    import { agentSubordinateApi,agentSubordinateStatusUpdateApi } from '../../http/api';
    export default {
        data() {
            return {
                level_id: localStorage.getItem('level_id'),
                // table表头
                tableHead: [
                    {
                        name: '编号',
                        prop: 'id'
                    },
                    {
                        name: '下级代理',
                        prop: 'code'
                    },
                    {
                        name: '姓名',
                        prop: 'realname'
                    },
                    {
                        name: '代理余额',
                        prop: 'money',
                    },
                    {
                        name: '礼金余额',
                        prop: 'cmoney',
                    },
                    {
                        name: '状态',
                        prop: 'status_text',
                    },
                    {
                        name: '其它',
                        prop: '',
                    },
                    {
                        name: '操作',
                        prop: ''
                    },
                ],
                // table内容
                tableBody: [],
                // 其他弹窗
                showOther: false,
                otherData: ""
            }
        },
        methods: {
            // 初始化
            agentSubordinateData() {
                var _this = this;
                this.$loading.show();
                agentSubordinateApi().then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message;
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 操作-启动/锁定
            statusUpdate (item){
                var _this = this;
                var msg;
                var status;
                if(item.status_text == '锁定'){
                    msg = "请确认启动" + item.code + "（" + item.realname + "）？";
                    status = 1
                }else{
                    msg = "请确认锁定" + item.code + "（" + item.realname + "）？";
                    status = 0
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: msg,
                    confirmButtonColor: '#5c7dec'
                }).then(() => {
                    // var data = {
                    //     id: item.id,
                    //     status: status
                    // }
                    // _this.$loading.show();
                    // agentSubordinateStatusUpdateApi(data).then(res => {
                    //     _this.$toast({
                    //         message: res.data.message,
                    //         position: 'bottom',
                    //     });
                    //     _this.agentSubordinateData()
                    // }).catch(err => {
                    //     _this.$loading.hide();
                    //     _this.$toast({
                    //         message: err.message,
                    //         position: 'bottom',
                    //     });
                    // })
                }).catch(() => {
                    // on cancel
                });
            },
            // 操作-编辑
            edit(item) {
                this.$router.push('/addAgentSubordinate');
                this.$store.commit('upSubordinate', item)
            },
            // 操作-转账
            transferd(item) {
                var _this = this;
                if(item.status_text == '锁定'){
                    this.$toast({
                        message: '锁定的代理线，不能进行转账。',
                        position: 'bottom',
                    });
                }else if(localStorage.getItem('has_pay_pwd') == 'false'){
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: '为了您的资金安全，请先设置支付密码',
                        confirmButtonText: '去设置',
                        confirmButtonColor: '#5c7dec'
                    }).then(() => {
                        _this.$router.push('/personalInformation')
                    }).catch(() => {
                        // on cancel
                    });
                }else{
                    this.$router.push('/agentSubordinateRechange?id=' + item.id)
                }
            },
        },
        mounted () {
            this.agentSubordinateData()
        },
        components: {
            tableLocked
        }
    }
</script>