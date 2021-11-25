<template>
    <div>
        <van-nav-bar title="代存记录" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-cell-group class="search">
                    <van-field
                        v-model="data.Name"
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
                        <van-button type="primary" @click="recordData">查询</van-button>
                    </van-col>
                </van-row>

                <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'代存记录'" :isTableLeft='false' @goSort="sortClick">
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="data.Page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
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
    </div>
</template>

<script>
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    import { agentDepositRecordApi } from '../../http/api';
    export default {
        data () {
            var myDate = new Date();
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 选择日期
                showCalendar: false,
                minDate: new Date(myDate.getTime() - 24*60*60*1000*31*3),
                maxDate: new Date(),
                calendarText: '开始日期 至 结束日期',
                // 选择时间
                timeTabs: dateColumns(),
                timeNum: -1,
                // table表头
                tableHead: [
                    {
                        name: '代存时间',
                        prop: 'date'
                    },
                    {
                        name: '会员账号',
                        prop: 'user'
                    },
                    {
                        name: '订单号',
                        prop: 'fundsn'
                    },
                    {
                        name: '代存金额',
                        prop: 'amount',
                        isSort: true,
                        SortType: ""
                    },
                    {
                        name: '状态',
                        prop: 'status'
                    },
                    {
                        name: '备注',
                        prop: 'remark'
                    },
                ],
                // table内容
                tableBody: [],
                // 查询
                data:{
                    Start: "",
                    End: "",
                    Name: "",
                    Sort: "",
                    SortType: "",
                    Page: 1
                },
                // 分页
                total: 0,
                pagesize: 0,
            }
        },
        methods: {
            recordData() {
                var _this = this;
                this.$loading.show()
                agentDepositRecordApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.total = res.data.message.Total;
                    _this.pagesize = res.data.message.PageSize;
                    _this.tableBody = res.data.message.Data
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
                if(item.SortType == 'Asc'){
                    this.data.SortType = 'asc';
                }else if(item.SortType == 'Desc'){
                    this.data.SortType = 'desc'
                }else{
                    this.data.SortType = ''
                }
                this.recordData()
            },
            // 分页
            pageChange(val){
                this.data.Page = val;
                this.recordData()
            }
        },
        mounted () {
            this.recordData()
        },
        components: {
            tableLocked
        }
    }
</script>
