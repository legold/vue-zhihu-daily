<template>
    <div class="dropload dropload-down">
       <div class="dropload-start" v-show="droploadStatus==1" @click="startLoad">点击查看更多</div>
        <div class="dropload-load" v-show="droploadStatus==2" @click="startLoad"><span class="d_loading"></span>加载中...</div>
        <div class="dropload-noData" v-show="droploadStatus==3">已无更多内容</div>
    </div>
</template>
<script>
import index from './index/index'
export default {
    name: 'dropload',
    props: ['droploadStatus'],
    data() {
        return {
            
        }
    },
    computed: {},
    methods: {
       startLoad() {
          // console.log(this.$parent.$refs.articleList);
          // 向上派发事件，提示父级加载更多
          this.$emit('load');
       },
       // 是否达到底部 50px 内
       isReachBottom: function(){
          let winHeight = document.documentElement.clientHeight || window.innerHeight,
              scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
              totalHeight = winHeight + scrollTop,
              scrollHeight = document.documentElement.scrollHeight;
          // console.log(winHeight, scrollTop, scrollHeight);

          if((totalHeight + 50) >= scrollHeight){
              //下滑到距离底部50px处，就请求更多得数据
              return true;
          }else{
              return false;
          }
       },
       scrollHandler() {
           if(this.isReachBottom()){
              // console.log('到底了');
              // 向上派发 load 事件，提示父级组件可以加载更多了
              this.$emit('load');
           }  
       },
       onPageScroll: function(){
          let that = this;
          window.addEventListener('scroll', this.scrollHandler, false);        
       },
    },
    created() {
        // console.warn(this.$parent); 
    },
    mounted() {
        this.onPageScroll();

        // console.warn(this.$parent); 
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler, false);
    }
}
</script>
<style lang="scss" scoped>
    /*新的加载更多的样式*/
    /*loading组件 start*/
    .dropload-down{
    position: relative;
        height: 50px;
        overflow: hidden;
        font-size: 12px;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 1;
    }
    .dropload-load, .dropload-noData, .dropload-start {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #7E7E7E;
    }
    .dropload-load .d_loading {
        display: inline-block;
        height: 15px;
        width: 15px;
        border-radius: 100%;
        margin: 6px;
        margin-top: 4px;
        border: 2px solid #7E7E7E;
        border-bottom-color: transparent;
        vertical-align: middle;
        -webkit-animation: rotate 0.75s linear infinite;
        -moz-animation: rotate 0.75s linear infinite;
        animation: rotate 0.75s linear infinite;
    }
    @-webkit-keyframes rotate{
        0% {
            -webkit-transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes rotate{
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /*loading组件 end*/
</style>


