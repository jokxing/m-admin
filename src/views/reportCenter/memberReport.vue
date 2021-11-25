<template>
    <div>
        <van-nav-bar title="会员报表" left-arrow @click-left="$router.go(-1)"/>

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
                        <van-button type="primary" @click="AllUserReportData">查询</van-button>
                    </van-col>
                </van-row>

                <tableLocked 
                    :headData="tableHead" 
                    :bodyData="tableBody" 
                    :noDataText="'会员报表'" 
                    :isTableLeft='true'
                    :tdSlot="true"
                    @goSort="sortClick">
                        <tr class="tbody-content" v-for="(item,index) in tableBody">
                            <td class="first-col clearfix">{{ item.user_name }}</td>
                            <td :class="{ 'red': item.ins_win_money < 0, 'green': item.ins_win_money > 0 }">{{ item.ins_win_money }}</td>
                            <td>
                                {{ (item.bonus_money + item.agent_bonus + item.user_agent + item.uservip_system + item.bonus_system + item.dpt_bonus_money + item.water_money).toFixed(2) }}
                                <van-icon name="add-o" class="add" @click="showBonus = true;popupData = item" />
                            </td>
                            <td>{{ item.dpt_bonus_money }}</td>
                            <td>{{ item.game_fee }}</td>
                            <td :class="{ 'red': item.real_win_lost < 0, 'green': item.real_win_lost > 0 }">
                                {{ item.real_win_lost }}
                            </td>
                            <td>
                                <van-icon name="add-o" class="add" @click="showOther = true; popupData = item" />
                            </td>
                            <td>{{ item.transfer }}</td>
                            <td><span class="primary_color">操作</span></td>
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
        
        <!-- 内容2-弹窗 -->
        <van-popup class="report_center_popup" v-model="showBonus">
            <h5>内容2</h5>
            <van-row class="content">
                <ul class="fix">
                    <li>
                        内容2-1
                        <span class="float_r">{{ popupData.bonus_money }}</span>
                    </li>
                    <li>
                        内容2-2
                        <span class="float_r">{{ popupData.agent_bonus }}</span>
                    </li>
                    <li>
                        内容2-3
                        <span class="float_r">{{ popupData.user_agent }}</span>
                    </li>
                    <li>
                        内容2-4
                        <span class="float_r">{{ popupData.uservip_system }}</span>
                    </li>
                    <li>
                        内容2-5
                        <span class="float_r">{{ popupData.bonus_system }}</span>
                    </li>
                    <li>
                        内容2-6
                        <span class="float_r">{{ popupData.dpt_bonus_money }}</span>
                    </li>
                    <li>
                        内容2-7
                        <span class="float_r">{{ popupData.water_money }}</span>
                    </li>
                </ul>
                <van-button type="primary" size="large" @click="showBonus = false">确认</van-button>
            </van-row>
        </van-popup>

        <!-- 其它-弹窗 -->
        <van-popup class="report_center_popup" v-model="showOther">
            <h5>其它</h5>
            <van-row class="content">
                <ul class="fix">
                    <li>
                        其他1
                        <span class="float_r">{{ popupData.beat_num }}</span>
                    </li>
                    <li>
                        其他2
                        <span class="float_r">{{ popupData.beat_money }}</span>
                    </li>
                    <li>
                        其他3
                        <span class="float_r">{{ popupData.valid_betamt }}</span>
                    </li>
                    <li>
                        其他4
                        <span class="float_r">{{ popupData.dpt_money }}</span>
                    </li>
                    <li>
                        其他5
                        <span class="float_r">{{ popupData.wtd_money }}</span>
                    </li>
                </ul>
                <van-button type="primary" size="large" @click="showOther = false">确认</van-button>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
    import { AllUserReportApi } from '../../http/api';
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
                // table表头
                tableHead: [
                    {
                        name: '账号',
                        prop: 'user_name'
                    },
                    {
                        name: '内容1',
                        prop: 'ins_win_money',
                        isSort: true,
                        SortType: ""
                    },
                    {
                        name: '内容2',
                        prop: '',
                    },
                    {
                        name: '内容3',
                        prop: 'dpt_bonus_money'
                    },
                    {
                        name: '内容4',
                        prop: 'game_fee',
                    },
                    {
                        name: '内容5',
                        prop: 'real_win_lost',
                        isSort: true,
                        SortType: ""
                    },
                    {
                        name: '其他',
                        prop: ''
                    },
                    {
                        name: '内容6',
                        prop: 'transfer',
                        isSort: true,
                        SortType: ""
                    },
                    {
                        name: '操作',
                        prop: ''
                    },
                ],
                // table内容
                tableBody: [],
                // 查询
                data: {
                    Start: year + "-" + month + "-" + (day < 10 ? "0" + day : day),
                    End: year + "-" + month + "-" + (day < 10 ? "0" + day : day),
                    page: 1,
                    user_name: "",
                    sort: "",
                    sort_type: ""
                },
                // 分页
                total: 0,
                pagesize: 0,
                // 弹窗数据
                popupData: {},
                // 内容2-弹窗
                showBonus: false,
                // 其它 - 弹窗
                showOther: false,
            }
        },
        methods: {
            AllUserReportData() {
                var _this = this;
                this.$loading.show();
                AllUserReportApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.Data;
                    _this.total = res.data.message.Total;
                    _this.pagesize = res.data.message.Pagesize;
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中日期
            onConfirm(date) {
                const [start, end] = date;
                this.data.Start = getDate(start);
                this.data.End = getDate(end);
                this.showCalendar = false;
                this.calendarText = `${getDate(start)} 至 ${getDate(end)}`;
                this.timeNum = -1
            },
            timeTabClick (item,index){
                this.timeNum = index;
                this.data.Start = item.date[0];
                this.data.End = item.date[1];
                this.calendarText = `${item.date[0]} 至 ${item.date[1]}`
            },
            // 排序
            sortClick (item){
                this.data.sort = item.prop
                if(item.SortType == 'Asc'){
                    this.data.sort_type = 'asc';
                }else if(item.SortType == 'Desc'){
                    this.data.sort_type = 'desc'
                }else{
                    this.data.sort_type = ''
                }
                this.AllUserReportData()
            },
            // 分页
            pageChange(val){
                this.data.page = val;
                this.AllUserReportData()
            }
        },
        mounted () {
            this.AllUserReportData()
        },
        components: {
            tableLocked
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/reportCenter.less);
</style>