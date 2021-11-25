import Service from './axios.js'

const api = "/api"

// 登录
export const loginApi = data => {
    return Service({
        url: api + '/authorizations',
        method: 'post',
        data
    })
};

// 注册
export const registerApi = data => {
    return Service({
        url: api + '/register',
        method: 'post',
        data
    })
};

// 基本信息
export const mainApi = data => {
    return Service({
        url: api + '/main',
        method: 'get'
    })
}

// 首页-数据展示
export const indexInfoApi = data => {
    return Service({
        url: api + '/indexInfo',
        method: "get"
    })
}

// 首页-报表
export const indexReportApi = data => {
    return Service({
        url: api + '/indexReport?Month=' + data,
        method: "get"
    })
}

// 公告列表
export const noticeApi = data => {
    return Service({
        url: api + '/notice',
        method: 'post',
        data
    })
}

// 公告详情
export const noticeDetailApi = data => {
    return Service({
        url: api + '/noticeDetail',
        method: 'post',
        data
    })
}

// 用户列表
export const MemberListApi = data => {
    return Service({
        url: api + '/MemberList',
        method: 'post',
        data
    })
}

// 点击调级的时候请求
export const CheckChangeLeveApi = data => {
    return Service({
        url: api + '/CheckChangeLeve',
        method: 'post',
        data
    })
}

// 会员账号
export const checUserStatusApi = data => {
    return Service({
        url: api + '/checUserStatus',
        method: 'post',
        data
    })
}

// 调线统计
export const MonthChangeLineRecordApi = data => {
    return Service({
        url: api + "/MonthChangeLineRecord",
        method: 'get'
    })
}

// 调级统计
export const MonthChangeLeveRecordApi = data => {
    return Service({
        url: api + "/MonthChangeLeveRecord",
        method: 'get'
    })
}

// 会员调线申请
export const ChangeLineApi = data => {
    return Service({
        url: api + "/ChangeLine",
        method: 'post',
        data
    })
}

// 会员调线记录
export const ChangeLineLogsListApi = data => {
    return Service({
        url: api + "/ChangeLineLogsList",
        method: "post",
        data
    })
}

// 会员调级申请
export const ChangeLeveApi = data => {
    return Service({
        url: api + "/ChangeLeve",
        method: "post",
        data
    })
}

// 会员调级记录
export const ChangeLevelLogsListApi = data => {
    return Service({
        url: api + "/ChangeLevelLogsList",
        method: "post",
        data
    })
}

// 上传图片初始化
export const UpImgApi = data => {
    return Service({
        url: api + "/UpImg",
        method: "get"
    })
}

// 下级管理列表
export const agentSubordinateApi = data => {
    return Service({
        url: api + "/agentSubordinate",
        method: "post",
        data
    })
}

// 下级管理列表-操作 启动/锁定
export const agentSubordinateStatusUpdateApi = data => {
    return Service({
        url: api + "/agentSubordinateStatusUpdate",
        method: "post",
        data
    })
}

// 下级管理列表-编辑详情与资料
export const agentSubordinateUpdateApi = data => {
    return Service({
        url: api + "/agentSubordinateUpdate",
        method: "post",
        data
    })
}

// 下级管理列表-重置登陆密码
export const agentSubordinateResetPasswordApi = data => {
    return Service({
        url: api + "/agentSubordinateResetPassword",
        method: "post",
        data
    })
}

// 下级管理列表-重置登陆密码
export const agentSubordinateResetPayPasswordApi = data => {
    return Service({
        url: api + "/agentSubordinateResetPayPassword",
        method: "post",
        data
    })
}

// 下级管理列表-转账
export const agentSubordinateRechangeApi = data => {
    return Service({
        url: api + "/agentSubordinateRechange",
        method: "post",
        data
    })
}

// 下级管理列表-创建
export const agentSubordinateMakeCodoApi = data => {
    return Service({
        url: api + "/agentSubordinateMakeCode",
        method: "post",
        data
    })
}

// 下级管理列表-创建-提交
export const agentSubordinateAddApi = data => {
    return Service({
        url: api + "/agentSubordinateAdd",
        method: "post",
        data
    })
}

// 游戏列表查询
export const GameReportApi = data => {
    return Service({
        url: api + "/GameReport",
        method: "post",
        data
    })
}

// 游戏列表详情
export const GameReportDetailApi = data => {
    return Service({
        url: api + "/GameReportDetail",
        method: "post",
        data
    })
}

// 存提款记录
export const UserFundApi = data => {
    return Service({
        url: api + "/UserFund",
        method: "post",
        data
    })
}

// 存提款记录
export const agentFundflowApi = data => {
    return Service({
        url: api + "/agentFundflow",
        method: "post",
        data
    })
}

// 提款金额
export const DrawMoneyInfoApi = data => {
    return Service({
        url: api + "/DrawMoneyInfo",
        method: "get"
    })
}

// 提款记录
export const DrawHisApi = data => {
    return Service({
        url: api + "/DrawHis",
        method: "post",
        data
    })
}

// 银行卡列表
export const BankCardListApi = data => {
    return Service({
        url: api + "/BankCardList",
        method: "get",
    })
}

// 新增银行卡
export const AddBankCardApi = data => {
    return Service({
        url: api + "/AddBankCard",
        method: "post",
        data
    })
}

// 删除银行卡
export const DelBankCardApi = data => {
    return Service({
        url: api + "/DelBankCard",
        method: "post",
        data
    })
}

// 检查支付密码
export const checkPayPwdApi = data => {
    return Service({
        url: api + "/checkPayPwd",
        method: "post",
        data
    })
}

// 发送验证码
export const SendSmsApi = data => {
    return Service({
        url: api + "/SendSms" + (data ? data : ''),
        method: "get"
    })
}

// 发起提款
export const withDrawApi = data => {
    return Service({
        url: api + "/withDraw",
        method: "post",
        data
    })
}

// 代存
export const agentDepositApi = data => {
    return Service({
        url: api + "/agentDeposit",
        method: "post",
        data
    })
}

// 代存记录
export const agentDepositRecordApi = data => {
    return Service({
        url: api + "/agentDepositRecord",
        method: "post",
        data
    })
}

// 礼金
export const agentBonusApi = data => {
    return Service({
        url: api + "/agentBonus",
        method: "post",
        data
    })
}

// 礼金记录
export const aagentBonusRecordApi = data => {
    return Service({
        url: api + "/agentBonusRecord",
        method: "post",
        data
    })
}

//财务报表
export const commissionReportApi = data => {
    return Service({
        url: api + "/commissionReport",
        method: "post",
        data
    })
}

// 会员报表
export const AllUserReportApi = data => {
    return Service({
        url: api + "/AllUserReport",
        method: "post",
        data
    })
}

// 邀请有奖报表
export const InvitationRewardReportApi = data => {
    return Service({
        url: api + "/InvitationRewardReport",
        method: "post",
        data
    })
}

// 代理邀请报表
export const InvitAgentRewardReportApi = data => {
    return Service({
        url: api + "/InvitAgentRewardReport",
        method: "post",
        data
    })
}

// 推广网址
export const ganeraAgentImportApi = data => {
    return Service({
        url: api + "/generaAgentImport",
        method: "post",
        data
    })
}

// 生成短链
export const makeShortLinkApi = data => {
    return Service({
        url: api + "/makeShortLink",
        method: "post",
        data
    })
}

// 推广素材
export const generaAgentPopularizeApi = data => {
    return Service({
        url: api + "/generaAgentPopularize",
        method: "post",
        data
    })
}

// 代理邀请推广
export const generaAgentRegImportApi = data => {
    return Service({
        url: api + "/generaAgentRegImport",
        method: "post",
        data
    })
}

// 个人资料
export const agentBaseInfoApi = data => {
    return Service({
        url: api + "/agentBaseInfo",
        method: "post",
        data
    })
}

// 检验验证码是否正确
export const checkCodeApi = data => {
    return Service({
        url: api + "/checkCode",
        method: "post",
        data
    })
}

// 修改登陆密码
export const updatePwdApi = data => {
    return Service({
        url: api + "/updatePwd",
        method: "post",
        data
    })
}

// 重置登陆密码
export const setPwdApi = data => {
    return Service({
        url: api + "/setPwd",
        method: "post",
        data
    })
}

// 修改支付密码
export const updatePayPwdApi = data => {
    return Service({
        url: api + "/updatePayPwd",
        method: "post",
        data
    })
}

// 重置支付密码
export const setPayPwdApi = data => {
    return Service({
        url: api + "/setPayPwd",
        method: "post",
        data
    })
}

// 修改代理信息
export const agentEditInfoApi = data => {
    return Service({
        url: api + "/agentEditInfo",
        method: "post",
        data
    })
}

// 联系我们
export const contact_usApi = data => {
    return Service({
        url: api + "/contact_us",
        method: "post",
        data
    })
}

// 回电服务
export const backcallApi = data => {
    return Service({
        url: api + "/backcall",
        method: "post",
        data
    })
}

// 帮助中心
export const supportCenterApi = data => {
    return Service({
        url: api + "/supportCenter",
        method: "post",
        data
    })
}

// VIP专享
export const vipListApi = data => {
    return Service({
        url: api + "/vipList",
        method: "get",
    })
}


// 消息走马灯消息
export const marqueeApi = data => {
    return Service({
        url: api + "/marquee",
        method: "post",
        data
    })
}