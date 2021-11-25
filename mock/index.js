const Mock = require('mockjs')
const fs = require("fs");
const getJsonData = function(module) {
  const fileJson = fs.readdirSync(`./mock${module ? "/" + module : ""}`);
  const jsonObj = {};
  fileJson.forEach(jsonName => {
    if (/.json/gi.test(jsonName)) {
      jsonObj[jsonName.split(".")[0]] = require(`.${
        module ? "/" + module : ""
      }/${jsonName}`);
    }
  });
  return jsonObj;
};

const baseURL = "/api";


function setRequestURL(requestMethod, requestURL) {
  const temp = `${requestMethod} ${baseURL}${requestURL}`;
  return temp.replace(/\"/g, "");
}

const testData = Mock.mock(getJsonData('test'));

const test = {
  [setRequestURL("POST", '/authorizations')]: testData.login,
  [setRequestURL("GET", '/SendSms')]: testData.SendSms,
  [setRequestURL("POST", '/register')]: testData.register,
  [setRequestURL("GET", '/indexInfo')]: testData.indexInfo,
  [setRequestURL("GET", '/main')]: testData.main,
  [setRequestURL("POST", '/marquee')]: testData.marquee,
  [setRequestURL("GET", '/vipList')]: testData.vipList,
  [setRequestURL("POST", '/notice')]: testData.notice,
  [setRequestURL("POST", '/noticeDetail')]: testData.noticeDetail,
  [setRequestURL("POST", '/agentBaseInfo')]: testData.agentBaseInfo,
  [setRequestURL("POST", '/updatePwd')]: testData.updatePwd,
  [setRequestURL("POST", '/updatePayPwd')]: testData.updatePayPwd,
  [setRequestURL("POST", '/checkCode')]: testData.checkCode,
  [setRequestURL("POST", '/setPwd')]: testData.setPwd,
  [setRequestURL("POST", '/setPayPwd')]: testData.setPwd,
  [setRequestURL("POST", '/agentEditInfo')]: testData.setPwd,
  [setRequestURL("POST", '/MemberList')]: testData.MemberList,
  [setRequestURL("POST", '/CheckChangeLeve')]: testData.CheckChangeLeve,
  [setRequestURL("GET", '/MonthChangeLineRecord')]: testData.MonthChangeLineRecord,
  [setRequestURL("GET", '/UpImg')]: testData.UpImg,
  [setRequestURL("POST", '/ChangeLine')]: testData.ChangeLine,
  [setRequestURL("POST", '/ChangeLineLogsList')]: testData.ChangeLineLogsList,
  [setRequestURL("POST", '/checUserStatus')]: testData.checUserStatus,
  [setRequestURL("GET", '/MonthChangeLeveRecord')]: testData.MonthChangeLeveRecord,
  [setRequestURL("POST", '/ChangeLeve')]: testData.ChangeLine,
  [setRequestURL("POST", '/ChangeLevelLogsList')]: testData.ChangeLevelLogsList,
  [setRequestURL("POST", '/UserFund')]: testData.UserFund,
  [setRequestURL("GET", '/DrawMoneyInfo')]: testData.DrawMoneyInfo,
  [setRequestURL("POST", '/DrawHis')]: testData.DrawHis,
  [setRequestURL("GET", '/BankCardList')]: testData.BankCardList,
  [setRequestURL("POST", '/DelBankCard')]: testData.DelBankCard,
  [setRequestURL("POST", '/checkPayPwd')]: testData.checkPayPwd,
  [setRequestURL("POST", '/withDraw')]: testData.withDraw,
  [setRequestURL("POST", '/agentDeposit')]: testData.withDraw,
  [setRequestURL("POST", '/agentDepositRecord')]: testData.agentDepositRecord,
  [setRequestURL("POST", '/agentBonus')]: testData.withDraw,
  [setRequestURL("POST", '/agentBonusRecord')]: testData.agentBonusRecord,
  [setRequestURL("POST", '/commissionReport')]: testData.commissionReport,
  [setRequestURL("POST", '/AllUserReport')]: testData.AllUserReport,
  [setRequestURL("POST", '/InvitationRewardReport')]: testData.InvitationRewardReport,
  [setRequestURL("POST", '/InvitAgentRewardReport')]: testData.InvitAgentRewardReport,
  [setRequestURL("POST", '/generaAgentImport')]: testData.generaAgentImport,
  [setRequestURL("POST", '/makeShortLink')]: testData.makeShortLink,
  [setRequestURL("POST", '/generaAgentRegImport')]: testData.generaAgentRegImport,
  [setRequestURL("POST", '/generaAgentPopularize')]: testData.generaAgentPopularize,
  [setRequestURL("POST", '/agentSubordinate')]: testData.agentSubordinate,
  [setRequestURL("POST", '/agentSubordinateMakeCode')]: testData.agentSubordinateMakeCode,
  [setRequestURL("POST", '/agentFundflow')]: testData.agentFundflow,
}
 
module.exports = Object.assign(
  test
);