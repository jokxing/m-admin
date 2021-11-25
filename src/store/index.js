import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 首页初始化数据
    indexInfo: "",
    // vip专享初始化数据
    vipListData: '',
    // 公告类型
    noticeType: "",
    // 财务报表 - 详情
    commissionDetail: "",
    // 帮助
    helpData: [],
    // main数据
    mainData: "",
    // 首页-公告
    marqueeContent: "",
    // 首页tab
    homeTab: 0,
    // 下级管理-编辑
    subordinate: "",
    // 一级代理输赢报表-tab
    oneWinLoseType: 0,
    // 会员推广网址和专属域名
    spreadUrlData: ""
  },
  mutations: {
    // 首页初始化数据
    upIndexInfoData (state,val) {
        state.indexInfo = val
    },
    // 首页初始化数据
    upVipListData (state,val) {
        state.vipListData = val
    },
    // 选中公告类型
    upNoticeType (state,val) {
        state.noticeType = val
    },
    // 财务报表 - 详情获取数据
    upCommissionDetail(state,val) {
        state.commissionDetail = val
    },
    // 帮助
    upHelpContents(state,val) {
        state.helpData = val
    },
    // main数据
    upMainData(state,val){
        state.mainData = val
    },
    // 首页-公告
    upMarqueeContent (state,val){
        state.marqueeContent = val
    },
    // 首页tab
    upHomeTab (state,val){
        state.homeTab = val
    },
    // 下级管理-编辑
    upSubordinate (state,val){
        state.subordinate = val
    },
    // 一级代理输赢报表-tab
    upOneWinLoseType (state,val){
        state.oneWinLoseType = val
    },
    // 会员推广网址和专属域名
    upSpreadUrlData (state,val){
        state.spreadUrlData = val
    }
  },
  actions: {},
  modules: {},
});
