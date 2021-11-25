<template>
    <div id="member_transfer_line_record">
        <van-nav-bar title="调级记录" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <div class="main_inner">
                <van-cell-group class="search">
                    <van-field
                        :left-icon="leftIcon"
                        placeholder="输入会员账号"
                    />
                </van-cell-group>

                <van-row class="screen" type="flex" justify="space-between">
                    <van-col span="7" @click="showStatus = true">
                        <div class="screen_box">{{ statusText }}<van-icon name="arrow-down" /></div>
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
                        <van-button type="primary" @click="changeLineLogsListData">查询</van-button>
                    </van-col>
                </van-row>

                <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'转线记录'" :isTableLeft='false' :tdSlot="true">
                    <tr class="tbody-content" v-for="(item,index) in tableBody">
                        <td class="first-col clearfix">{{ item.created_at }}</td>
                        <td>{{ item.post_member_name }}</td>
                        <td>{{ item.register_at }}</td>
                        <td>{{ item.before_level_id }}</td>
                        <td>{{ item.new_level_id }}</td>
                        <td>
                            <span class="yellow" v-if="item.status == 0">待审核</span>
                            <span class="green" v-if="item.status == 1">成功</span>
                            <span class="red" v-if="item.status == 2">拒绝</span>
                        </td>
                        <td>{{ item.verify_remark }}</td>
                    </tr>
                </tableLocked>

                <!-- 分页 -->
                <van-pagination v-model="ruleForm.page" v-if="total > pagesize " :total-items="total" :items-per-page="pagesize" mode="simple" @change="pageChange" />
            </div>
        </div>

        <!-- 状态 -->
        <van-popup v-model="showStatus" round position="bottom">
            <van-picker
                show-toolbar
                :columns="statusColumns"
                @cancel="showStatus = false"
                @confirm="onStatus"
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
    import { ChangeLevelLogsListApi } from '../../http/api.js';
    import { getDate, dateColumns } from '../../assets/js/utils.js'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data () {
            var myDate = new Date();
            return {
                leftIcon: require('../../assets/img/icon-search.png'),
                // 状态
                statusText: '所有状态',
                showStatus: false,
                statusColumns: [
                    {
                        text: '全部', 
                        status: '',
                    },
                    {
                        text: '审核中', 
                        status: '0',
                    },
                    {
                        text: '成功', 
                        status: '1',
                    },
                    {
                        text: '拒绝', 
                        status: '2',
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
                ruleForm: {
                    Name: '',
                    Status: "",
                    Page: 1,
                    Start: "",
                    End: "",
                },
                // table表头
                tableHead: [
                    {
                        name: '提交时间',
                        prop: 'created_at'
                    },
                    {
                        name: '用户名',
                        prop: 'post_member_name'
                    },
                    {
                        name: '注册时间',
                        prop: 'register_at'
                    },
                    {
                        name: '原级别',
                        prop: 'before_level_id'
                    },
                    {
                        name: '调后级别',
                        prop: 'new_level_id'
                    },
                    {
                        name: '状态',
                        prop: 'status'
                    },
                    {
                        name: '审核备注',
                        prop: 'verify_remark'
                    },
                ],
                // table内容
                tableBody: [],
                // 分页
                page: 1,
                total: 0,
                pagesize: 0
            }
        },
        methods: {
            changeLineLogsListData () {
                var _this = this;
                this.$loading.show();
                ChangeLevelLogsListApi(_this.ruleForm).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.Data;
                    _this.total = res.data.message.Total;
                    _this.pagesize = res.data.message.Pagesize;
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中状态
            onStatus(value) {
                this.statusText = value.text;
                this.ruleForm.Status = value.status;
                this.showStatus = false;
            },
            // 选中日期
            onConfirm(date) {
                const [start, end] = date;
                this.ruleForm.Start = getDate(start);
                this.ruleForm.End = getDate(end);
                this.showCalendar = false;
                this.calendarText = `${getDate(start)} 至 ${getDate(end)}`;
                this.timeNum = -1
            },
            timeTabClick (item,index){
                this.timeNum = index;
                this.ruleForm.Start = item.date[0];
                this.ruleForm.End = item.date[1];
                this.calendarText = `${item.date[0]} 至 ${item.date[1]}`
            },
            // 分页
            pageChange(val){
                this.ruleForm.page = val;
                this.changeLineLogsListData()
            }
        },
        mounted () {
            this.changeLineLogsListData()
        },
        components: {
            tableLocked
        }
    }
</script>