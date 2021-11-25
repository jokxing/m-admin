<template>
  <div class="loading-container" v-show="show">
    <div class="loading_box">
      <div class="loading">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style>
.loading-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0003;
  z-index: 1;
}

.loading_box {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}

.loading {
  display: flex;
  justify-content: center;
}

.loading i {
  width: 50px;
  height: 50px;
  position: relative;
  display: block;
  border-radius: 50%;
  background: linear-gradient(transparent 0%, transparent 50%,
          #fff 50%, #fff 100%);
  -webkit-animation: loading 1s linear 0s infinite;
}
@-webkit-keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-moz-keyframes  loading-moz{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
