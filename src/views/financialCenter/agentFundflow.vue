<template>
    <div>
        <van-nav-bar title="代存转账记录" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-cell-group class="search">
                    <van-field
                        :left-icon="leftIcon"
                        placeholder="输入会员账号"
                    />
                </van-cell-group>

                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="7" @click="showType = true">
                        <div class="screen_box" style="font-size: 12px;">{{ typeText }}<van-icon name="arrow-down" /></div>
                    </van-col>
                    <van-col span="16" @click="showCalendar = true">
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
                        <van-button type="primary" @click="agentFundflowData">查询</van-button>
                    </van-col>
                </van-row>

                <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'代存转账记录'" :isTableLeft='false' :tdSlot="true">
                    <tr class="tbody-content" v-for="(item,index) in tableBody">
                        <td class="first-col clearfix">{{ item.name }}</td>
                        <td>{{ item.realname }}</td>
                        <td :class="{ red: item.type == '收入', green: item.type == '支出'}">{{ item.money }}</td>
                        <td>{{ item.leave_money }}</td>
                        <td :class="{ red: item.type == '收入', green: item.type == '支出'}">{{ item.type }}</td>
                        <td>{{ item.created_at }}</td>
                    </tr>
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="data.Page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
            </div>
        </div>

        <!-- 选择类型 -->
        <van-popup v-model="showType" round position="bottom">
            <van-picker
                show-toolbar
                :columns="typeColumns"
                @cancel="showtype = false"
                @confirm="ontype"
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
    import { agentFundflowApi } from '../../http/api'
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data() {
            var myDate = new Date();
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 类型
                typeText: '所有类型',
                showType: false,
                typeColumns: [
                    {
                        text: '全部', 
                        type: '',
                    },
                    {
                        text: '收入', 
                        type: '1',
                    },
                    {
                        text: '支出', 
                        type: '2',
                    },
                ],
                // 选择日期
                showCalendar: false,
                minDate: new Date(myDate.getTime() - 24*60*60*1000*31*3),
                maxDate: new Date(),
                calendarText: '开始日期 至 结束日期',
                // 选择时间
                timeTabs: dateColumns(),
                timeNum: -1,
                // 查询
                data: {
                    Type: "",
                    Start: "",
                    End: "",
                    Name: "",
                    Page: 1
                },
                // table表头
                tableHead: [
                    {
                        name: '代理账号',
                        prop: 'name'
                    },
                    {
                        name: '姓名',
                        prop: 'realname'
                    },
                    {
                        name: '转账金额',
                        prop: 'money'
                    },
                    {
                        name: '剩余金额',
                        prop: 'leave_money'
                    },
                    {
                        name: '资金类型',
                        prop: 'type'
                    },
                    {
                        name: '完成时间',
                        prop: 'created_at'
                    },
                ],
                // table内容
                tableBody: [],
                // 分页
                total: 0,
                pagesize: 0
            }
        },
        methods: {
            agentFundflowData () {
                var _this = this;
                this.$loading.show();
                agentFundflowApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.data;
                    _this.total = res.data.message.total;
                    _this.pagesize = res.data.message.per_page
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中类型
            ontype(value) {
                this.typeText = value.text;
                this.data.Type = value.type;
                this.showType = false;
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
            // 分页
            pageChange(val){
                this.data.Page = val;
                this.agentFundflowData()
            }
        },
        mounted () {
            this.agentFundflowData()
        },
        components: {
            tableLocked
        }
    }
</script>