import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('../components/footer.vue'),
    meta: { index : 0 },
    children: [
      { 
        path: '/home', 
        name: "home",
        meta:{
          requireAuth: true,
        },
        component: () => import( '../views/home/home.vue') 
      },
      {
        path: '/VIPonly',
        name: 'VIPonly',
        meta:{
          requireAuth: true,
          level: ['1','2','3']
        },
        component: () => import('../views/vip/VIPonly.vue'),
      },
      {
        path: '/withdrawCenter',
        name: 'withdrawCenter',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/financialCenter/withdrawCenter.vue'),
      },
      { 
        path: '/my', 
        name: "my",
        meta:{
          requireAuth: true,
        },
        component: () => import( '../views/my/my.vue') 
      },
    ]
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
  },

  // VIP专享
  {
    path: '/vipDetail',
    name: 'vipDetail',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/vip/vipDetail.vue'),
  },

  // 公告专区
  {
    path: '/notice',
    name: 'notice',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/notice/notice.vue'),
  },
  {
    path: '/noticeDetail/:id',
    name: 'noticeDetail',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/notice/noticeDetail.vue'),
  },

  // 我的组
  {
    path: '/personalInformation',
    name: 'personalInformation',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/personalInformation.vue'),
  },
  {
    path: '/editPassword',
    name: 'editPassword',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/editPassword.vue'),
  },
  {
    path: '/editPayPassword',
    name: 'editPayPassword',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/editPassword.vue'),
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/resetPassword.vue'),
  },
  {
    path: '/resetPasswordForm',
    name: 'resetPasswordForm',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/resetPasswordForm.vue'),
  },
  {
    path: '/resetPayPasswordForm',
    name: 'resetPayPasswordForm',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/resetPasswordForm.vue'),
  },
  {
    path: '/resetPayPassword',
    name: 'resetPayPassword',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/resetPassword.vue'),
  },
  {
    path: '/editQQMode',
    name: 'editQQMode',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/editMode.vue'),
  },
  {
    path: '/editmailMode',
    name: 'editmailMode',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/editMode.vue'),
  },
  {
    path: '/editOtherMode',
    name: 'editOtherMode',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/personalInformation/editMode.vue'),
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/contactUs.vue'),
  },
  {
    path: '/help',
    name: 'help',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/help.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/my/about.vue'),
  },

  // 管理中心
  {
    path: '/memberManage',
    name: 'memberManage',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberManage.vue'),
  },
  {
    path: '/memberTransferLine',
    name: 'memberTransferLine',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberTransferLine.vue'),
  },
  {
    path: '/memberTransferLineRecord',
    name: 'memberTransferLineRecord',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberTransferLineRecord.vue'),
  },
  {
    path: '/memberLogoutSearch',
    name: 'memberLogoutSearch',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberLogoutSearch.vue'),
  },
  {
    path: '/memberLevelAdjustment',
    name: 'memberLevelAdjustment',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberLevelAdjustment.vue'),
  },
  {
    path: '/memberLevelAdjustmentRecord',
    name: 'memberLevelAdjustmentRecord',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/manageCenter/memberLevelAdjustmentRecord.vue'),
  },
  {
    path: '/despositWithdrawalRecord',
    name: 'despositWithdrawalRecord',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/memberRecord/despositWithdrawalRecord.vue'),
  },
  {
    path: '/agentSubordinate',
    name: 'agentSubordinate',
    meta:{
      requireAuth: true,
      level: ['1','2']
    },
    component: () => import('../views/manageCenter/agentSubordinate.vue'),
  },
  {
    path: '/addAgentSubordinate',
    name: 'addAgentSubordinate',
    meta:{
      requireAuth: true,
      level: ['1','2']
    },
    component: () => import('../views/manageCenter/addAgentSubordinate.vue'),
  },
  {
    path: '/subordinateResetPwd',
    name: 'subordinateResetPwd',
    meta:{
      requireAuth: true,
      level: ['1','2']
    },
    component: () => import('../views/manageCenter/subordinateResetPwd.vue'),
  },
  {
    path: '/agentSubordinateRechange',
    name: 'agentSubordinateRechange',
    meta:{
      requireAuth: true,
      level: ['1','2']
    },
    component: () => import('../views/manageCenter/agentSubordinateRechange.vue'),
  },

  // 财务中心
  {
    path: '/withdrawRecord',
    name: 'withdrawRecord',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/financialCenter/withdrawRecord.vue'),
  },
  {
    path: '/withdrawBankcard',
    name: 'withdrawBankcard',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/financialCenter/withdrawBankcard.vue'),
  },
  {
    path: '/withdrawBankcardEdition',
    name: 'withdrawBankcardEdition',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/financialCenter/withdrawBankcardEdition.vue'),
  },
  {
    path: '/memberDeposit',
    name: 'memberDeposit',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/financialCenter/depositJackpotPage.vue'),
  },
  {
    path: '/jackpotGift',
    name: 'jackpotGift',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/financialCenter/depositJackpotPage.vue'),
  },
  {
    path: '/memberDepositRecord',
    name: 'memberDepositRecord',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/financialCenter/memberDepositRecord.vue'),
  },
  {
    path: '/jackpotGiftRecord',
    name: 'jackpotGiftRecord',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/financialCenter/jackpotGiftRecord.vue'),
  },
  {
    path: '/agentFundflow',
    name: 'agentFundflow',
    meta:{
      requireAuth: true,
      level: ['1', '2']
    },
    component: () => import('../views/financialCenter/agentFundflow.vue'),
  },

  // 报表中心
  {
    path: '/commissionReport',
    name: 'commissionReport',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/reportCenter/commissionReport.vue'),
  },
  {
    path: '/commissionReportMonth',
    name: 'commissionReportMonth',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/reportCenter/commissionReportMonth.vue'),
  },
  {
    path: '/commissionReportWinLose',
    name: 'commissionReportWinLose',
    meta:{
      requireAuth: true,
    },
    component: () => import('../views/reportCenter/commissionReportWinLose.vue'),
  },
  {
    path: '/memberReport',
    name: 'memberReport',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/reportCenter/memberReport.vue'),
  },
  {
    path: '/inviteRewardReport',
    name: 'inviteRewardReport',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/reportCenter/inviteRewardReport.vue'),
  },
  {
    path: '/inviteProxyReport',
    name: 'inviteProxyReport',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/reportCenter/inviteProxyReport.vue'),
  },
  
  // 推广专区
  {
    path: '/spreadUrl',
    name: 'spreadUrl',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/spreadCenter/spreadUrl.vue'),
  },
  {
    path: '/exclusiveDomain',
    name: 'exclusiveDomain',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/spreadCenter/exclusiveDomain.vue'),
  },
  {
    path: '/spreadProxyUrl',
    name: 'spreadProxyUrl',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/spreadCenter/spreadProxyUrl.vue'),
  },
  {
    path: '/spreadMaterial',
    name: 'spreadMaterial',
    meta:{
      requireAuth: true,
      level: ['3']
    },
    component: () => import('../views/spreadCenter/spreadMaterial.vue'),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  if(to.query.access_token && to.query.access_token != ''){
    localStorage.setItem('access_token', to.query.access_token)
  }
  
  var level_id = localStorage.getItem('level_id')
  
	if(to.meta.requireAuth == true){
    if(localStorage.getItem("access_token") || to.query.access_token) {
      if(to.meta.level){
        if(!to.query.access_token){
          if(to.meta.level.indexOf(level_id) != -1){
            next()
          }else{
            next('/404')
          }
        // app在url传access_token
        }else{
          next()
        }
      }else{
        next()
      }
    }else{
      next('/login')
    }
	}else{
    next()
    // if(localStorage.getItem("access_token") && to.path == '/login') {
    //   next('/home')
    // }else{
    //   next()
    // }
  }
});

export default router;
