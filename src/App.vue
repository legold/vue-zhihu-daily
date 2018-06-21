<template>
  <div id="app">   

    <transition :name="transitionName">
      <keep-alive class="app_view">
        <router-view/>
      </keep-alive>
    </transition> 
    
    <!-- <div>{{ loginMsg }}</div> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
       loginMsg: '今日头条',
       transitionName: 'slide-left',
       timer: null, 
    }
  },
  watch: {
    '$route' (to, from) {
       let that = this;
       console.log(to, from);
       //如果to索引大于from索引,判断为前进状态,反之则为后退状态
       if(to.meta.index > from.meta.index){
          // 设置动画明后才能
          this.transitionName = 'slide-left';
       }else{
          this.transitionName = 'slide-right';
       }
    }
  },
  methods: {
  },
  components: {
  },
  created(){
     /*const that = this;
     that.$http({
        url: '/api/4/news/latest',
        success(res){
           console.log(res);
        }
     });*/
     /* this.$router.afterEach((to, from) => {
       console.warn(to, from);
     }); */
  },
  
}
</script>

<style lang="scss">
/* [v-cloak]{
  display: none;
} */
/*
 这种方式也可以引入全局样式
 @import '../static/css/common.css';
*/
/* @import './assets/fonts/iconfont.css'; */
body{
		background: #F3F3F3;
} 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background: #eee; */  
  min-height: 100vh;

  .fade{
     -webkit-transition-duration: .2s;
     transition-duration: .2s;
  }

  .app_view{
    opacity: 1;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active{
    will-change: transform;
    -webkit-transition: all 300ms cubic-bezier(.19,.53,.21,1.01);
    transition: all 300ms cubic-bezier(.19,.53,.21,1.01);
  }

  .slide-right-enter {
    opacity: 0.05; 
    transform: translate3d(-60%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0.05; 
    transform: translate3d(60%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0.05; 
    transform: translate3d(60%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0.05;
    transform: translate3d(-60%, 0, 0);
  }
}
</style>
