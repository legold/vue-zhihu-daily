<template>
    <div class="articleList">
       <!-- <div class="date">{{ isToaday(formatTime(articleData.date)) }}</div> -->
       <div class="date">{{ showDay(articleIndex) }}</div>
       <div class="list" v-for="item in articleItem.stories" :key="item.id" @click="goDetail(item.id)">
           <div class="story">
               <span class="text">{{ item.title }}</span>
               <img :src="item.images[0]" class="aticle_pic">
           </div>
       </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'

export default {
    name: 'articleList',
    props: ['articleItem', 'articleIndex'],
    data() {
        return {}
    },
    methods: {
       formatTime(date) {
           // 用于将 date '20180616' 格式的字符串转化为标准的日期字符串
           /*
           if(date){
              var arr = date.split(''),
                  newDate = date.substr(4,2);
              arr.splice(4, 2, ('/' + newDate + '/'));
              return arr.join('');
           }
           */
          if(date){
              let syear = date.substr(0, 4),
                  smonth = date.substr(4, 2),
                  sdate = date.substr(6),
                  newDate = syear + '/' + smonth + '/' + sdate;
              return {
                  y: syear,
                  m: smonth,
                  d: sdate,
                  n: newDate
              }             
          }
       },
       getDay(opt) {
            if(opt && ({}).toString.call(opt) === '[object Object]'){
                let str = '星期',
                    arr = ['日', '一', '二', '三', '四', '五', '六'];
                return str + arr[new Date(opt.n).getDay()];
            }
       },
       isToaday(opt) {
            if(opt && ({}).toString.call(opt) === '[object Object]'){
                return (new Date(opt.n).toDateString() == new Date().toDateString()) ? '今日热闻' : (opt.m+'月'+opt.d+'日 '+ this.getDay(opt));
            }
       },
       // 上面的俩个方法废弃
       getToday(index) {
           let date = this.articleItem.date;
           let year = date.slice(0, 4);
           let month = date.slice(4, 6);
           let day = date.slice(6);
           let today = new Date(year + '/' + month + '/' + day);
           let week = ['日', '一', '二', '三', '四', '五', '六'];
           return month + '月' + day + '日' + ' 星期' + week[today.getDay()];
       },
       showDay(index) {
           return index === 0 ? '今日热闻' : this.getToday(index);
       },
       // 去详情页
       goDetail(id) {
           // alert(111);
           this.$router.push({ name: 'detail', params: {id} });
           // console.log(id);
           if(!this.$store.state.showGoDetailLoading){
               Indicator.open({
                  text: '加载中',
                  spinnerType: 'fading-circle'
               });
           }
       }
    },
    filters: {
        /*
        isToaday(opt) {
            if(opt && ({}).toString.call(opt) === '[object Object]'){
                console.log(opt.n, new Date(opt.n).toDateString() );
                console.warn(new Date().toDateString(), opt.m+'月'+opt.d+'日 ');
                console.warn(this);
                return (new Date(opt.n).toDateString() == new Date().toDateString()) ? '今日热闻' : (opt.m+'月'+opt.d+'日 '+ this.getDay(opt));
            }
        },
        */
        
    },
    created() {
        // console.log(this['articleItem']);
    }
}
</script>
<style lang="scss" scoped>
  /* .articleList{
      background: #F3F3F3;
  } */
  .articleList{
      padding: 0 10px;
      font-size: 14px;

      .date{
         font-size: 12px;
         padding: 10px 0;
      }
      .list:not(:last-child){
            margin-bottom: 10px;
      }
      .list .story{
        display:-webkit-box;
	    display:-moz-box;
	    display:-ms-flexbox;
	    display:-webkit-flex;
	    display:flex;
	    flex-direction:row;
	    -webkit-box-pack: space-between;
	    -moz-justify-content: space-between;
	    -webkit-justify-content: space-between;
	    justify-content:space-between;
	    -webkit-box-align: flex-start;
	    -moz-align-items: flex-start;
	    -webkit-align-items: flex-start;
	    align-items:flex-start;

        background: #fff;
        padding: 10px;
        border-radius: 3px;
        box-shadow: 0 0 1px #CBCBCB;
        
        
        
        .text{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            padding-right: 10px;
            font-size: 16px;
            line-height: 22px;
        }
        .aticle_pic{
            width: 75px;
            height: 75px;
        }
      }
  }
</style>


