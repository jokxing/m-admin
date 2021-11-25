<template>
    <div id="member_transfer_line_record">
        <van-nav-bar title="存提款记录" left-arrow @click-left="$router.go(-1)"/>

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
                        <van-button type="primary" @click="userFundData">查询</van-button>
                    </van-col>
                </van-row>

                <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'游戏记录'" :isTableLeft='false'>
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="data.page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
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
    import { UserFundApi } from '../../http/api.js';
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data () {
            var myDate = new Date();
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 类型
                typeText: '所有类型',
                showType: false,
                typeColumns: [
                    {
                        text: '全部', 
                        status: '',
                    },
                    {
                        text: '存款', 
                        status: '1',
                    },
                    {
                        text: '提款', 
                        status: '2',
                    },
                    {
                        text: '代理存款', 
                        status: '3',
                    },
                    {
                        text: '代理礼金', 
                        status: '4',
                    },
                ],
                // 选择日期
                showCalendar: false,
                minDate: new Date(myDate.getTime() - 24*60*60*1000*31*3),
                maxDate: new Date(),
                calendarText: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + "-" + myDate.getDate() + ' 至 ' + myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + "-" + myDate.getDate(),
                // 选择时间
                timeTabs: dateColumns(),
                timeNum: 0,
                // 查询
                data: {
                    Act: "",
                    Start: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + "-" + myDate.getDate(),
                    End: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + "-" + myDate.getDate(),
                    Name: "",
                    Page: 1
                },
                // table表头
                tableHead: [
                    {
                        name: '序号',
                        prop: 'id'
                    },
                    {
                        name: '会员账号',
                        prop: 'name'
                    },
                    {
                        name: '昵称',
                        prop: 'realname'
                    },
                    {
                        name: '金额',
                        prop: 'money'
                    },
                    {
                        name: '资金类型',
                        prop: 'actname'
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
            // 初始化
            userFundData () {
                var _this = this;
                this.$loading.show();
                UserFundApi(_this.data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.list;
                    _this.total = res.data.message.total;
                    _this.pagesize = res.data.message.Pagesize
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中游戏平台
            ontype(value) {
                this.typeText = value.text;
                this.data.Act = value.status;
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
                this.data.page = val;
                this.userFundData()
            }
        },
        mounted () {
            if(this.$route.query.name){
                this.data.Name = this.$route.query.name;
            }
            this.userFundData()
        },
        components: {
            tableLocked
        }
    }
</script>