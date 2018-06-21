<template>
  <div id="app">    
      <keep-alive>
        <router-view/>
      </keep-alive>
    
    <!-- <div>{{ loginMsg }}</div> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
       loginMsg: '今日头条'
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
}
</style>
