<template>
    <div>
        <router-view/>

        <van-tabbar v-model="active" active-color="#617DEF" inactive-color="#8C9BA9" @change="hanledChange">
            <van-tabbar-item name="home" replace to="/home">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? iconHome.active : iconHome.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="VIPonly" to="/VIPonly">
                <span>VIP专享</span>
                <template #icon="props">
                    <img :src="props.active ? iconVip.active : iconVip.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="withdrawCenter">
                <span>提款专区</span>
                <template #icon="props">
                    <img :src="props.active ? iconAgent.active : iconAgent.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item name="my" replace to="/my">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? iconMy.active : iconMy.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: '',
                iconHome: {
                    active: require('../assets/img/footer/icon-home-active.svg'),
                    inactive: require('../assets/img/footer/icon-home.svg'),
                },
                iconVip: {
                    active: require('../assets/img/footer/icon-vip-active.svg'),
                    inactive: require('../assets/img/footer/icon-vip.svg'),
                },
                iconAgent: {
                    active: require('../assets/img/footer/icon-withdraw-active.svg'),
                    inactive: require('../assets/img/footer/icon-withdraw.svg'),
                },
                iconMy: {
                    active: require('../assets/img/footer/icon-my-active.svg'),
                    inactive: require('../assets/img/footer/icon-my.svg'),
                },
                backbuttonSet: null
            };
        },
        methods: {
            hanledChange(val,index){
                if(val == 'withdrawCenter'){
                    var bill_wtd = JSON.parse(localStorage.getItem('bill_wtd'))
                    if(bill_wtd){
                        this.$router.push('/' + val)
                    }else{
                        this.$toast({
                            message: '暂时不开放',
                            position: 'bottom',
                        });
                    }
                }
            },
        },
        mounted () {
            this.active = this.$route.name
        },
        watch: {
            $route(to,from){
                this.active = to.name
            }
        },
    }
</script>

<style lang="less" scoped>
</style>