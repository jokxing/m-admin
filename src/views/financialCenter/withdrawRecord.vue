<template>
    <div id="withdraw_record">
        <van-nav-bar title="提款记录" left-arrow @click-left="$router.go(-1)"/>

        <div class="main">
            <van-row class="screen" type="flex" justify="space-between">
                <van-col span="13" @click="showStatus = true">
                    <div class="screen_box">{{ statusText }}<van-icon name="arrow-down" /></div>
                </van-col>
                <van-col span="10">
                    <van-button type="primary" @click="DrawHisData">查询</van-button>
                </van-col>
            </van-row>

            <tableLocked :headData="tableHead" :bodyData="tableBody" :noDataText="'提款记录'" :isTableLeft='false' :tdSlot="true">
                <tr class="tbody-content" v-for="(item,index) in tableBody">
                    <td class="first-col clearfix">{{ item.created_at }}</td>
                    <td>{{ item.fundsn }}</td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.money }}</td>
                    <td>
                        <span :class="{ 'green': item.status == '成功', 'red': item.status == '拒绝', 'grey': item.status == '处理中' }">{{ item.status }}</span>
                    </td>
                </tr>
            </tableLocked>

            <!-- 分页 -->
            <van-pagination v-model="Page" v-if="total > PageSize " :total-items="total" :items-per-page="PageSize" mode="simple" @change="pageChange" />
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
    </div>
</template>

<script>
    import { DrawHisApi } from '../../http/api.js'
    import tableLocked from '../../components/tableLocked.vue'
    export default {
        data () {
            return {
                // 状态
                statusText: '所有状态',
                showStatus: false,
                Status: "",
                statusColumns: [
                    {
                        text: '全部', 
                        status: '',
                    },
                    {
                        text: '成功', 
                        status: '2',
                    },
                    {
                        text: '拒绝', 
                        status: '3',
                    },
                    {
                        text: '处理中', 
                        status: '4',
                    },
                ],
                // table表头
                tableHead: [
                    {
                        name: '提款时间',
                        prop: 'created_at'
                    },
                    {
                        name: '订单号',
                        prop: 'fundsn'
                    },
                    {
                        name: '提款账号',
                        prop: 'account'
                    },
                    {
                        name: '金额',
                        prop: 'money'
                    },
                    {
                        name: '状态',
                        prop: 'status'
                    },
                ],
                // table内容
                tableBody: [],
                // 分页
                Page: 1,
                PageSize: 15,
                total: 0
            }
        },
        methods: {
            // 提款记录
            DrawHisData () {
                var _this = this;
                var data = {
                    Page: this.Page,
                    PageSize: this.PageSize,
                    Status: this.Status
                }
                _this.$loading.show();
                DrawHisApi(data).then(res => {
                    _this.$loading.hide();
                    _this.tableBody = res.data.message.Data;
                    _this.total = res.data.message.Total
                }).catch(err => {
                    _this.$loading.hide()
                })
            },
            // 选中状态
            onStatus(value) {
                this.statusText = value.text;
                this.Status = value.status;
                this.showStatus = false;
            },
            // 分页
            pageChange(val){
                this.Page = val;
                this.DrawHisData()
            }
        },
        mounted () {
            this.DrawHisData()
        },
        components: {
            tableLocked
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/financialCenter.less);
</style>