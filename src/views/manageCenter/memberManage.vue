<template>
    <div class="memberManage">
        <van-nav-bar title="会员管理" left-arrow @click-left="$router.back('/home')"/>

        <div class="main">
            <div class="main_inner">
                <van-cell-group class="search">
                    <van-field
                        :left-icon="leftIcon"
                        placeholder="输入会员账号"
                        v-model="Name"
                    />
                </van-cell-group>

                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="7" @click="showLevel = true">
                        <div class="screen_box">{{ levelText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                    <van-col span="7" @click="showStatus = true">
                        <div class="screen_box">{{ statusText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                    <van-col span="7" @click="showDate = true">
                        <div class="screen_box">{{ dateText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                </van-row>
                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="16" @click="showCalendar = true">
                        <div class="screen_box screen_calendar">
                            <img src="../../assets/img/icon-calendar.png" width="20">
                            {{ calendarText }}
                        </div>
                    </van-col>
                    <van-col span="7" @click="MemberListData"><van-button type="primary">查询</van-button></van-col>
                </van-row>

                <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'会员记录'" @memberDeposit="memberDepositClick" :tdSlot="true">
                    <tr class="tbody-content" v-for="(item,index) in tableBody">
                        <td class="first-col clearfix">{{ item.name }}</td>
                        <td>{{ item.account }}</td>
                        <td>{{ item.level_name }}</td>
                        <td class="red">{{ item.user_dpt_money }}</td>
                        <td class="green">{{ item.wtd_money }}</td>
                        <td :class="{ 'green': item.ins_win > 0, 'red': item.ins_win < 0 }">{{ item.ins_win }}</td>
                        <td
                            :class="{ red: item.status_name == '停权户' || item.status_name == '密码锁定', yellow: item.status_name == '试玩' || item.status_name == '内部试玩', grey: item.status_name == '注销', green: item.status_name == '正常户' }">{{ item.status_name }}</td>
                        <td>{{ item.addTime }}</td>
                        <td>{{ item.last_login_time }}</td>
                        <td class="operation">
                            <span class="primary_color" @click="operation('会员代存',item)">会员代存</span>
                            <span class="primary_color" @click="operation('礼金赠送',item)">礼金赠送</span>
                            <span class="primary_color" @click="$router.push('/despositWithdrawalRecord?name=' + item.name)">存提款记录</span>
                            <span class="primary_color" @click="operation('会员调级',item)">会员调级</span>
                        </td>
                    </tr>
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
            </div>
        </div>

        <!-- 所有等级 -->
        <van-popup v-model="showLevel" round position="bottom">
            <van-picker
                show-toolbar
                :columns="levelColumns"
                @cancel="showLevel = false"
                @confirm="onLevel"
            />
        </van-popup>

        <!-- 会员状态 -->
        <van-popup v-model="showStatus" round position="bottom">
            <van-picker
                show-toolbar
                :columns="statusColumns"
                @cancel="showStatus = false"
                @confirm="onStatus"
            />
        </van-popup>

        <!-- 注册时间 -->
        <van-popup v-model="showDate" round position="bottom">
            <van-picker
                show-toolbar
                :columns="dateColumns"
                @cancel="showDate = false"
                @confirm="onDate"
            />
        </van-popup>

        <!-- 开始日期 至 结束日期 -->
        <van-calendar 
            v-model="showCalendar" 
            type="range" 
            color="#617DEF" 
            :min-date="minDate" 
            :max-date="maxDate"
            @confirm="onConfirm" />
    </div>
</template>

<script>
    import { MemberListApi, CheckChangeLeveApi } from '../../http/api.js'
    import { getDate, dateColumns } from '../../assets/js/utils'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data() {
            var myDate = new Date();
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 会员账号
                Name: "",
                // 等级
                levelText: '所有等级',
                level_id: '',
                showLevel: false,
                levelColumns: [
                    {
                        text: '所有等级', 
                        level_id: '',
                    },
                    {
                        text: '1级', 
                        level_id: '1',
                    },
                    {
                        text: '2级', 
                        level_id: '2',
                    },
                    {
                        text: '3级', 
                        level_id: '3',
                    },
                    {
                        text: '4级', 
                        level_id: '4',
                    },
                    {
                        text: '5级', 
                        level_id: '5',
                    },
                    {
                        text: '6级', 
                        level_id: '6',
                    },
                    {
                        text: '7级', 
                        level_id: '7',
                    },
                    {
                        text: '8级', 
                        level_id: '8',
                    },
                    {
                        text: '9级', 
                        level_id: '9',
                    },
                    {
                        text: '10级', 
                        level_id: '10',
                    },
                ],
                // 会员状态
                statusText: '会员状态',
                status: '',
                showStatus: false,
                statusColumns: [
                    {
                        text: '会员状态', 
                        status: '0',
                    },
                    {
                        text: '静止户', 
                        status: '11',
                    },
                    {
                        text: '正常户', 
                        status: '1',
                    },
                    {
                        text: '停权户', 
                        status: '0',
                    },
                    {
                        text: '密码锁定', 
                        status: '5',
                    },
                    {
                        text: '内部试玩', 
                        status: '6',
                    },
                    {
                        text: '沉默户', 
                        status: '99',
                    },
                ],
                // 注册时间
                dateText: '注册时间',
                showDate: false,
                dateColumns: dateColumns(),
                // 选择日期
                date: '',
                showCalendar: false,
                minDate: new Date(myDate.getTime() - 24*60*60*1000*31*3),
                maxDate: new Date(),
                calendarText: '开始日期 至 结束日期',
                // 开始日期和结束日期
                Start: "",
                End: "",
                // table表头
                tableHead: [
                    {
                        name: '账号',
                        prop: 'name'
                    },
                    {
                        name: '姓名',
                        prop: 'account'
                    },
                    {
                        name: '等级',
                        prop: 'level_name'
                    },
                    {
                        name: '存款',
                        prop: 'user_dpt_money',
                        class: 'red'
                    },
                    {
                        name: '取款',
                        prop: 'wtd_money',
                        class: 'green'
                    },
                    {
                        name: '总输赢',
                        prop: 'ins_win',
                    },
                    {
                        name: '状态',
                        prop: 'status_name',
                    },
                    {
                        name: '注册时间',
                        prop: 'addTime'
                    },
                    {
                        name: '最后登陆',
                        prop: 'last_login_time'
                    },
                    {
                        name: '操作',
                        prop: ''
                    },
                ],
                // table内容
                tableBody: [],
                // 分页
                page: 1,
                total: 0,
                pagesize: 0,
            };
        },
        methods: {
            // 初始化
            MemberListData () {
                var _this = this;
                var data = {
                    Start: this.Start,
                    End: this.End,
                    Name: this.Name,
                    Page: this.page,
                    Sort: this.Sort,
                    SortType: '',
                    level_id: this.level_id,
                    status: this.status
                };
                this.$loading.show();
                MemberListApi(data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.Data;
                    _this.total = res.data.message.Total;
                    _this.pagesize = res.data.message.Pagesize
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中等级
            onLevel(value) {
                this.levelText = value.text;
                this.level_id = value.level_id;
                this.showLevel = false;
            },
            // 选中会员状态
            onStatus(value) {
                this.statusText = value.text;
                this.status = value.status;
                this.showStatus = false;
            },
            // 选中注册时间
            onDate(value) {
                this.dateText = value.text;
                this.showDate = false;
                this.Start = value.date[0];
                this.End = value.date[1];
            },
            // 选中日期
            onConfirm(date) {
                const [start, end] = date;
                this.Start = getDate(start);
                this.End = getDate(end);
                this.showCalendar = false;
                this.calendarText = `${getDate(start)} 至 ${getDate(end)}`;
                this.dateText = "注册时间"
            },
            // 会员代存
            memberDepositClick (item) {
                this.$router.push('/memberDeposit?data=' + item.name)
            },
            // 操作
            operation (type, row) {
                var _this = this;
                if(row.account){
                    if(type == '会员代存'){
                        if(localStorage.getItem('has_pay_pwd') == 'true'){
                            this.$router.push('/memberDeposit?name=' + row.name)
                        }else{
                            this.$dialog.confirm({
                                title: '温馨提示',
                                message: '为了您的资金安全，请先设置支付密码',
                                confirmButtonText: '去设置',
                                confirmButtonColor: '#5c7dec'
                            })
                            .then(() => {
                                _this.$router.push('/personalInformation')
                            })
                            .catch(() => {
                            });
                        }
                    }
                    if(type == "礼金赠送"){
                        this.$router.push('/jackpotGift?name=' + row.name)
                    }
                    if(type == '会员调级'){
                        if(row.status_name == '静止户'){
                            this.$toast({
                                message: '请完善好身份证与银行卡资料，需要正常户方可申请',
                                position: 'bottom',
                            });
                        }else{
                            var data = {
                                Name: row.name
                            };
                            this.$loading.show()
                            CheckChangeLeveApi(data).then(res => {
                                _this.$loading.hide();
                                _this.$router.push('/memberLevelAdjustment?name=' + row.name)
                            }).catch(err => {
                                _this.$loading.hide();
                                _this.$toast({
                                    message: err.message,
                                    position: 'bottom',
                                });
                            })
                        }
                    }
                }else{
                    this.$toast({
                        message: '该会员资料未完善，需要正常户才能操作',
                        position: 'bottom',
                    });
                }
            },
            // 分页
            pageChange(val){
                this.page = val;
                this.MemberListData()
            }
        },
        mounted() {
            this.MemberListData()
        },
        components: {
            tableLocked
        }
    };
</script>

<style lang="less" scoped>
    @import url(../../assets/css/manageCenter.less);
</style>