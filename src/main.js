// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'

// 引入全局样式表(初始化)
import '../static/css/common.css'

// axios 请求
import $http from './utils/http.js'
Vue.prototype.$http = $http

// 引入 Mint UI
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

// 引入 iconfont
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

/*import Vuex from 'vuex'
Vue.use(Vuex)*/
/*const store = new Vuex.Store({
  state: {
  	 count: 0
  }
})*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 将 store 实例注入到根组件下的所有组件
  store,
  // 子组件通过 this.$store 来访问 store
  components: { App },
  template: '<App/>'
})

// 注册全局后置钩子函数，用以监听 url 地址变化
router.afterEach((to, from) => {
  // console.warn(to, from);
  let name = to.name;
  if(name == 'index'){
     store.commit('CHANGE_CURRENT_INDEX', -1);
  }else if(name == 'theme'){
     let id = to.params.id,
         themeList = store.state.themeList,
         i,
         len;
     for(i=0, len=themeList.length; i<len; i++){
        if(id*1===themeList[i].id*1){
           store.commit('CHANGE_CURRENT_INDEX', i);
           break;
        }
     } 
  }
});
