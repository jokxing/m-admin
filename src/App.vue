<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAlive">
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        keepAlive: 'main-keep-alive',
        transitionName: '',
      };
    },
    watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false
      }
    },
    mounted() {
    },
  }
</script>

<style lang="less">
  html,
  body {
    height: 100%;
    font-size: 16px;
    overflow: hidden;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    max-width: 15rem;
    margin: auto;
    position: relative;

    .Router {
      width: 100%;
      position: fixed;
      height: 100%;
      transition: all .2s ease;
      will-change: transform;
      top: 0;
      backface-visibility: hidden;
      perspective: 1000;
    }
    .slide-left-enter,
    .slide-right-leave-active {
      // opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      // opacity: 0;
      transform: translate3d(100%, 0 ,0);
    }
  }
</style>
