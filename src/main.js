import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import "amfe-flexible";
import loading from '@/assets/js/loading.js'
import VueClipboard from 'vue-clipboard2'

import { Button, Circle, Col, Row, Icon, Tabbar, TabbarItem, Checkbox, CheckboxGroup, NavBar, Tab, Tabs, Field, Cell, CellGroup, Picker, Popup, Calendar, Pagination, Uploader, Dialog, cascader, Area, Image as VanImage, Form, Notify, Loading, Toast, Progress } from 'vant';

Vue.config.productionTip = false;

Vue.config.$dialog = Dialog;
Vue.config.$notify = Notify;
Vue.config.$toast = Toast;
Vue.prototype.$http = axios

Vue.use(loading);
Vue.use(VueClipboard)

Vue.use(Button)
  .use(Circle)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Popup)
  .use(Calendar)
  .use(Pagination)
  .use(Uploader)
  .use(cascader)
  .use(Area)
  .use(VanImage)
  .use(Form)
  .use(Loading)
  .use(Progress);

  window.addEventListener('popstate', function (e) {
    router.isBack = true
  },false)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
