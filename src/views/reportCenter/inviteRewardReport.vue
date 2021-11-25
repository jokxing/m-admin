<template>
    <div>
        <van-nav-bar title="邀请有奖（会员）" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-cell-group class="search">
                    <van-field
                        v-model="data.user_name"
                        :left-icon="leftIcon"
                        placeholder="输入会员账号"
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
                    :noDataText="'邀请有奖'" 
                    :tableWidth="'100%'"
                    :isTableLeft='false' 
                    :tdSlot="true"
                    :arrow_left="true">
                        <tr class="tbody-content" v-for="(item,index) in tableBody">
                            <td class="first-col clearfix" :class="{ red: item.user_name == data.user_name}">{{ item.user_name }}</td>
                            <td>
                                <span>{{ item.suser1 }}</span> / {{ item.suser2 }}
                            </td>
                            <td>
                                {{ item.cost.toFixed(2) }}
                                <van-icon name="add-o" class="add" @click="showCost = true;popupData = item.sub_users" />
                            </td>
                        </tr>
                        <tr class="tbody-content" v-if="CountSubtotal != ''">
                            <td class="first-col clearfix">小计</td>
                            <td>
                                <span>{{ CountSubtotal.suser1 }}</span> / {{ CountSubtotal.suser2 }}
                            </td>
                            <td>{{ CountSubtotal.cost.toFixed(2) }}</td>
                        </tr>
                        <tr class="tbody-content" v-if="CountTotal != ''">
                            <td class="first-col clearfix">总计</td>
                            <td>
                                <span>{{ CountTotal.suser1 }}</span> / {{ CountTotal.suser2 }}
                            </td>
                            <td>{{ CountTotal.cost.toFixed(2) }}</td>
                        </tr>
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="data.page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
            </div>
        </div>

         <!-- 开始日期 至 结束日期 -->
        <van-calendar 
            v-model="showCalendar" 
            type="range" 
            color="#617DEF" 
            :min-date="minDate" 
            :max-date="maxDate"
            @confirm="onConfirm" />

        <!-- 推广成本-弹窗 -->
        <van-popup class="report_center_popup" v-model="showCost">
            <h5>推广成本</h5>
            <van-row class="content">
                <table border="0">
                    <thead>
                        <tr>
                            <th>下级账号</th>
                            <th>级别</th>
                            <th>推广成本</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in popupData" :key="index">
                            <td :class="{ red: item.user_name == data.user_name }">{{ item.user_name }}</td>
                            <td>{{ item.user_level }}</td>
                            <td>{{ item.cost }}</td>
                        </tr>
                    </tbody>
                </table>
                <van-button type="primary" size="large" @click="showCost = false">确认</van-button>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    import { InvitationRewardReportApi } from '../../http/api';
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
                    user_name: "",
                    page: 1
                },
                // table表头
                tableHead: [
                    {
                        name: '会员账号',
                        prop: 'user_name'
                    },
                    {
                        name: '一级/二级',
                        prop: '',
                    },
                    {
                        name: '推广成本',
                        prop: 'cost',
                    },
                ],
                // table内容
                tableBody: [],
                CountSubtotal: '',
                CountTotal: '',
                // 分页
                total: 0,
                pagesize: 50,
                // 推广成本
                showCost: false,
                popupData: []
            }
        },
        methods: {
            InvitationRewardReportData () {
                var _this = this;
                this.$loading.show();
                InvitationRewardReportApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.Data;
                    _this.total = res.data.message.Total;
                    _this.pagesize = res.data.message.per_page

                    _this.CountSubtotal = res.data.message.Count_Subtotal;
                    _this.CountTotal = res.data.message.Count_Total
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
            // 分页
            pageChange(val){
                this.data.page = val;
                this.InvitationRewardReportData()
            }
        },
        mounted () {
            this.InvitationRewardReportData()
        },
        components: {
            tableLocked
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/reportCenter.less);
</style>