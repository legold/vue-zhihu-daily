<template>
    <div class="detail" v-if="res">
        <!-- <router-view></router-view> -->
        <div class="header">
            <div class="back" @click="$router.go(-1);" v-if="homeFlag===1"><i class="iconfont icon-arrowleft"></i></div> 
            <div class="back" @click="$router.push('/')" v-else-if="homeFlag===0"><i class="iconfont icon-home1" style="font-size: 20px;"></i></div>
            <div class="icon-wrapper">
                <div class="icons">
                    <i class="iconfont icon-share"></i> 
                    <i class="iconfont icon-favorfill"></i> 
                    <i class="iconfont icon-comment_light" @click="goLookComments"><span class="text">{{transNumFormat(comments)}}</span></i> 
                    <i class="iconfont icon-appreciate_fill_light"><span class="text">{{transNumFormat(popularity)}}</span></i>
                    <!--
                    下面这种写法也可以
                    <i class="iconfont icon-appreciate_fill_light"><span class="text">{{this.$store.state.popularity}}</span></i>
                    <i class="iconfont icon-appreciate_fill_light"><span class="text">{{$store.state.popularity}}</span></i>
                    -->
                </div>
            </div>
        </div>
        <div class="detail-content">
            <div class="img-wrap" v-if="currentIndex*1 < 0">
                <h1 class="title">{{ res.title }}</h1>
                <span class="img-source">{{ res.image_source }}</span>
                <img :src="res.image" @error="$event.target.src = attachImageUrl(res.image)" alt="">
                <div class="img-mask"></div>
            </div>
            <div class="detail-body" v-html="res.body"></div>
        </div>
    </div>
</template>
<script>
import { transNumFormat } from '@/common/js/common'
import attachImageUrl from '../../../static/js/attachImageUrl.js'
import $http from '../../utils/http.js'
import { mapState, mapMutations } from 'vuex'
import { Indicator } from 'mint-ui'


export default {
    name: 'detail',
    data() {
        return {
            res: null,
            homeFlag: 1,  //  0 表示 左侧的 icon 是 home， 1 表示是后退箭头
        }
    },
    computed: {
        ...mapState({
            comments: 'comments',
            popularity: state => state.popularity,
            currentIndex: 'currentIndex'
        })
    },
    watch: {
        /*
        '$route' (to, from) {
	      // 对路由变化作出响应...
	      console.log(to, from);
          
          // 如果路由有变化，会再次执行该方法
	      this.fetchData();
	    },
        */
        
    },
    beforeRouteEnter (to, from, next) {
        // console.log(to);
        // console.log(1111);
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        // 请求详细数据
        $http({
            url: `/api/4/news/${to.params.id}`,
            success(res){
                // console.log(res);
                next(vm => vm.res = res);
                Indicator.close();
            }
        });        

    },
    created() {
        const len = window.history.length;
        if(len <= 1){
            this.homeFlag = 0;
        }else {
            this.homeFlag = 1;
        }
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同 
    /*
    beforeRouteUpdate (to, from, next) {
        const that = this;
        console.log(to.params.id);
        // 请求详细数据
        this.$http({
            url: `/api/4/news/${to.params.id}`,
            success(res){
            console.log(res);
                that.res = res;
                next();
            }
        });
    },
    */
    methods: {
       attachImageUrl,
       fetchData() {
            const that = this;
            let id = this.$route.params.id;
            // 请求详细数据
            this.$http({
                url: `/api/4/news/${id}`,
                success(res){
                  // console.log(res);
                  that.res = res;
                }
            });
       },
       goLookComments() {
           // console.log(11232);
           let id = this.$route.params.id;
           // console.log(id);
           this.$router.push({ path: `/comment/${id}` });
           // this.$router.push({ path: `/detail/${id}/comment` });
       },
       ...mapMutations({
           setStoryExtra: 'STORY_EXTRA',   //将 `this.setStoryExtra(amount)` 映射为 `this.$store.commit('setStoryExtra', amount)`
       }),
       // 评论和点赞数字转换函数
       transNumFormat,
    },
    activated() {
        // this.fetchData();
        const that = this;
        // 获取评论和点赞数据
        $http({
            url: `/api/4/story-extra/${that.$route.params.id}`,
            success(res){
                // console.log(res);
                // that.comments = res;

                // 在详情页中将评论的状态发送到全局状态保管， 使用了 mapMutations
                that.setStoryExtra({
                    comments: res.comments,
                    popularity: res.popularity,
                    long_comments: res.long_comments,
                    short_comments: res.short_comments
                });
            }
        }); 
    },
}
</script>
<style lang="scss">
//    .detail{
//        transition: all 0.11s;
//        transform: translate3d(0, 0, 0);
//        &.move-enter-active, &.move-leave-active{
//            transform: translate3d(100%, 0, 0);
//        } 
//    }
.detail{
    padding-top: 50px;
    .header{
        display:-webkit-box;
	    display:-moz-box;
	    display:-ms-flexbox;
	    display:-webkit-flex;
	    display:flex;
	    flex-direction:row;
	    -webkit-box-pack: flex-start;
	    -moz-justify-content: flex-start;
	    -webkit-justify-content: flex-start;
	    justify-content:flex-start;
	    -webkit-box-align: center;
	    -moz-align-items: center;
	    -webkit-align-items: center;
	    align-items:center;

	    position: fixed;
	    top:0;
		height: 50px;
		width: 100%;
		max-width: 640px;
		z-index: 3;
		color: #fff;
		background: #00A2ED;
		padding: 0 20px 0 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;

        .back{
            width: 40px;
            height: 40px;
            padding-left: 10px;
            line-height: 40px;
            .icon-arrowleft{
                font-size: 20px;
            }
        }
        .icon-wrapper{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;

            .icons{
                float: right;

                .iconfont{
                    display: inline-block;
                    margin-left: 14px;
                    font-size: 20px;

                    &:first-child{
                        font-size: 18px;
                    }

                    .text{
                        font-size: 14px;
                        padding-left: 2px;
                        line-height: 24px;
                        float: right;
                    }
                }
            }
        }
    }

    .detail-content{
        .img-wrap {
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid #f6f6f6;

            .title{
                position: absolute;
                bottom: 28px;
                left: 0;
                padding: 0 10px;
                font-size: 18px;
                line-height: 26px;
                color: #fff;
                z-index: 2;
            }
            .img-source{
                position: absolute;
                bottom: 8px;
                right: 0;
                padding: 0 10px;
                font-size: 12px;
                color: hsla(0,0%,94%,.9);
                z-index: 2;
            }
            .img-mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(0deg,rgba(0,0,0,.7),transparent);
                z-index: 1;
            }
        }

        @media (max-width: 320px) {
            .img-wrap {
                height:180px;
            }
        }

        @media (min-width: 320px) and (max-width:520px) {
            .img-wrap {
                height:200px;
            }
        }

        @media (min-width: 520px) and (max-width:640px) {
            .img-wrap {
                height:220px;
            }
        }

        @media (min-width: 640px) {
            .img-wrap {
                height:280px;
            }
        }
        
        .detail-body{

            .main-wrap{
                overflow: hidden;
                background-color: #fff;
                
                .headline{
                    border-bottom: 4px solid #f6f6f6;

                    .meta{
                        padding: 0 20px;
                        a{
                            color: #00A2ED;
                        }
                    }

                    .headline-title {
                        line-height: 1.2em;
                        color: #000;
                        font-size: 22px;
                        margin: 20px 0 10px;
                        padding: 0 20px!important;
                        font-weight: 700;
                        &.onlyheading{
                            margin: 20px 0;
                        }
                    }

                    .headline-background-link {
                        line-height: 2em;
                        position: relative;
                        padding: 20px 45px 20px 20px !important;
                        display: block;
                        text-decoration: none;

                        .heading{
                            font-size: 15px !important;
                            margin-bottom: 8px;
                            line-height: 1em;
                            color: #999;
                        }
                        .heading-content{
                            color: #444;
                            text-decoration: none;
                            font-size: 17px !important;
                            line-height: 1.2em;
                        }
                    }
                }
                .question {
                    padding: 0 20px!important;
                    overflow: hidden;

                    .meta{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size: 16px;
                        color: #b8b8b8;

                        .avatar{
                            width: 20px;
                            height: 20px;
                            border-radius: 2px;
                            margin-right: 5px;
                        }

                        span{
                            vertical-align: middle;
                        }
                        .author{
                            color: #444;
                        }
                        .bio{ color: #999; }
                    }
                    .content{
                        line-height: 1.6em;
                        margin: 10px 0 20px;
                        font-size: 17px;
                        color: #444;

                        p{
                            display: block;
                            -webkit-margin-before: 1em;
                            -webkit-margin-after: 1em;
                            -webkit-margin-start: 0px;
                            -webkit-margin-end: 0px;
                        }
                    }

                    .view-more{
                        text-align: right;
                        margin-bottom: 25px;

                        a{
                            color: #698ebf;
                            font-size: 14px;
                            text-decoration: none;
                        }
                    }
                }
                .question + .question {
                    border-top: 5px solid #f6f6f6;
                }

                .question-title{
                    font-size: 19px;
                    line-height: 1.4em;
                    color: #222;
                    font-weight: bold;
                    margin: 20px 0;
                }
            }
        }
        
    }
    
}
      
</style>


