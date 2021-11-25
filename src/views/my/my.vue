<template>
    <div id="my">
        <van-nav-bar title="我的"/>

        <div class="main">
            <ul>
                <li>
                    <router-link to="/personalInformation">
                        <span>个人资料</span>
                        <van-icon name="arrow" />
                    </router-link>
                </li>
                <li>
                    <router-link to="/contactUs">
                        <span>联系我们</span>
                        <van-icon name="arrow" />
                    </router-link>
                </li>
                <li>
                    <router-link to="/help">
                        <span>帮助中心</span>
                        <van-icon name="arrow" />
                    </router-link>
                </li>
                <li>
                    <router-link to="/about">
                        <span>关于我们</span>
                        <van-icon name="arrow" />
                    </router-link>
                </li>
            </ul>

            <van-button type="primary" round block @click="logout">退出登录</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            // 退出
            logout() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_time');
                localStorage.removeItem('mobile');
                localStorage.removeItem('agentLink');
                localStorage.removeItem('withdrawMoney');
                localStorage.removeItem('selectedBgImg');
                localStorage.removeItem('money');
                localStorage.removeItem('generateBankCardData');
                localStorage.removeItem('cmoney');
                localStorage.removeItem('has_pay_pwd');
                localStorage.removeItem('bill_wtd');
                localStorage.removeItem('gameDetail');

                this.$store.commit('upIndexInfoData', '');
                this.$store.commit('upNoticeType', '');
                this.$store.commit('upCommissionDetail', '');
                this.$store.commit('upHelpContents', []);
                this.$store.commit('upMainData', '');
                this.$store.commit('upMarqueeContent', '');
                this.$store.commit('upHomeTab', 0);
                this.$store.commit('upSpreadUrlData', '');
                
                this.$router.back('/login')
            }
        },
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/my.less);
</style>