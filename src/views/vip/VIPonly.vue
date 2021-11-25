<template>
    <div id="vip">
        <van-nav-bar title="VIP专享"/>

        <div class="main">
            <van-row class="list" v-for="(item,index) in list" :key="index" @click="$router.push('/' + item.actId)">
                <span>{{ item.label }}</span>
                <van-image
                    width="100%"
                    :src="item.img"
                />
                <h6>{{ item.name }}</h6>
                <p>{{ item.time }}</p>
            </van-row>
        </div>
    </div>
</template>

<script>
    import { vipListApi } from '../../http/api'
    export default {
        data () {
            return {
                list: []
            }
        },
        methods: {
            vipList () {
                var _this = this;
                if(this.$store.state.vipListData == ''){
                    this.$loading.show();
                    vipListApi().then(res => {
                        _this.$loading.hide();
                        _this.list = res.data.message;

                        _this.$store.commit('upVipListData',res.data.message)
                    }).catch(err => {
                        _this.$loading.hide();
                    })
                }else{
                    this.list = this.$store.state.vipListData
                }
            }
        },
        mounted () {
            this.vipList()
        }
    }
</script>

<style lang="less" scoped>
    @import url(../../assets/css/home.less);
</style>