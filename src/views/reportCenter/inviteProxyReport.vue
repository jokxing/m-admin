<template>
    <div>
        <van-nav-bar title="代理邀请报表" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-cell-group class="search">
                <van-field
                    v-model="data.agent_code"
                    :left-icon="leftIcon"
                    placeholder="输入下线代理"
                />
            </van-cell-group>

            <van-row class="screen" type="flex" justify="space-between">
                <van-col span="24" @click="showCalendar = true">
                    <div class="screen_box screen_calendar">
                        <img src="../../assets/img/icon-calendar.png" width="20">
                        {{ calendarText }}
                    </div>
                </van-col>
            </van-row>

            <van-row class="screen" type="flex" justify="space-between">
                <van-col span="16">
                    <ul>
                        <li 
                            v-for="(item, index) in timeTabs" 
                            :key="index" 
                            :class="{ active: timeNum == index }"
                            @click="timeTabClick(item,index)">{{ item.text }}</li>
                    </ul>
                </van-col>
                <van-col span="7">
                    <van-button type="primary" @click="InvitationRewardReportData">查询</van-button>
                </van-col>
            </van-row>

            <tableLocked 
                :headData="tableHead" 
                :bodyData="tableBody" 
                :noDataText="'代理邀请报表'" 
                :isTableLeft='false'
                :tdSlot="true">
                    <tr class="tbody-content" v-for="(item,index) in tableBody">
                        <td class="first-col clearfix">{{ item.name }}</td>
                        <td>{{ item.level }}</td>
                        <td :class="{ red: item.profit < 0, green: item.profit > 0}">{{ item.profit }}</td>
                        <td>{{ item.back_reward_rate }}</td>
                        <td>{{ item.vuser_num }}</td>
                        <td>{{ item.vuser_reward_money }}</td>
                        <td :class="{ red: item.reward < 0, green: item.reward > 0}">{{ item.reward }}</td>
                    </tr>
            </tableLocked>
        </div>

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
    import { InvitAgentRewardReportApi } from '../../http/api';
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data () {
            var myDate = new Date();
            var year = myDate.getFullYear()
            var month = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
            var day = myDate.getDate()
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 选择日期
                showCalendar: false,
                minDate: new Date(myDate.getTime() - 24*60*60*1000*31*3),
                maxDate: new Date(),
                calendarText: getDate(new Date()) + ' 至 ' + getDate(new Date()),
                // 选择时间
                timeTabs: dateColumns(),
                timeNum: 0,
                // 查询
                data: {
                    start_date: year + "-" + month + "-" + (day < 10 ? "0" + day : day),
                    end_date: year + "-" + month + "-" + (day < 10 ? "0" + day : day),
                    agent_code: "",
                },
                // table表头
                tableHead: [
                    {
                        name: '下线代理',
                        prop: 'name'
                    },
                    {
                        name: '级别',
                        prop: 'level',
                    },
                    {
                        name: '实际盈亏',
                        prop: 'profit',
                    },
                    {
                        name: '有效会员(本月)',
                        prop: 'vuser_num',
                    },
                    {
                        name: '推广收益（预算）',
                        prop: 'reward',
                    },
                ],
                // table内容
                tableBody: [],
            }
        },
        methods: {
            InvitationRewardReportData () {
                var _this = this;
                this.$loading.show();
                InvitAgentRewardReportApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message;
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中日期
            onConfirm(date) {
                const [start, end] = date;
                this.data.start_date = getDate(start);
                this.data.end_date = getDate(end);
                this.showCalendar = false;
                this.calendarText = `${getDate(start)} 至 ${getDate(end)}`;
                this.timeNum = -1
            },
            timeTabClick (item,index){
                this.timeNum = index;
                this.data.start_date = item.date[0];
                this.data.end_date = item.date[1];
                this.calendarText = `${item.date[0]} 至 ${item.date[1]}`
            },
        },
        mounted () {
            this.InvitationRewardReportData()
        },
        components: {
            tableLocked
        }
    }
</script>