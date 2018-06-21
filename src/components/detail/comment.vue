<template>
    <div class="comment" v-if="$store.state.comments !== ''">
        <div class="header">
            <div class="back" @click="goBackFunc"><i class="iconfont icon-arrowleft"></i></div> 
            <div class="edit">
                <span>{{ $store.state.comments }}条点评</span>
            </div>
            <div class="icon-wrapper">
                <div class="icons">
                    <i class="iconfont icon-editor"></i> 
                </div>
            </div>
        </div>
        <!-- <div class="aa" style="height: 700px;padding-top: 20px;">
            fefewfewf
        </div> -->
         <div class="comment-list">
            <!-- {{$store.state.long_comments}}  === {{$store.state.short_comments}} -->
            <div class="long_comment">
              <div class="commentHeader" @click="toggleLongComment">
                <span class="text">{{$store.state.long_comments}} 条长评</span>
                <i class="arrow iconfont" :class="[longCommentShow?'icon-unfold':'icon-packup']"></i>
              </div>
              <template v-if="longComments && longComments.comments.length">
                  <div class="comment-item onePixel" v-for="(item) in longComments.comments" :key="item.id" v-show="longCommentShow">
                    <div class="author">
                      <div class="avatar">
                        <img :src="item.avatar" class="image">
                      </div>
                      <span class="name">{{ item.author }}</span>
                      <div class="favour">
                          <i class="iconfont icon-appreciate_fill_light"></i> 
                          <span class="likes">{{item.likes}}</span>
                      </div>
                    </div>
                    <div class="comment-text">
                        <span class="long-text">{{item.content}}</span>
                        <span class="time">{{ item.time | showTime }}</span>
                    </div>
                  </div>
              </template>
              <div class="shafa-tip onePixel" v-else :style="{'min-height': shafaHeight}">
                  <i class="iconfont icon-shafa1"></i>
                  <p>深度长评虚位以待</p>
              </div>
            </div>
            <div class="short_comment">
                <div class="commentHeader onePixel" :class="{'onePixelBom': !shortCommentShow}" @click="toggleShortComment">
                    <span class="text">{{$store.state.short_comments}} 条短评</span>
                    <i class="arrow iconfont" :class="[shortCommentShow?'icon-unfold':'icon-packup']"></i>
                </div>
                <template v-if="shortComments && shortComments.comments.length">
                  <div class="comment-item onePixel" v-for="(item) in shortComments.comments" :key="item.id" v-show="shortCommentShow">
                    <div class="author">
                      <div class="avatar">
                        <img :src="item.avatar" class="image">
                      </div>
                      <span class="name">{{ item.author }}</span>
                      <div class="favour">
                          <i class="iconfont icon-appreciate_fill_light"></i> 
                          <span class="likes">{{item.likes}}</span>
                      </div>
                    </div>
                    <div class="comment-text">
                        <span class="long-text">{{item.content}}</span>
                        <span class="time">{{ item.time | showTime }}</span>
                    </div>
                  </div>
              </template>
            </div>
        </div>
       
    </div>
</template>
<script>
import attachImageUrl from '../../../static/js/attachImageUrl.js'
import $http from '../../utils/http.js'
import { Indicator } from 'mint-ui'

export default {
    name: 'comment',
    data() {
        return {
            longComments: null,
            shortComments: null,  // 评论和点赞
            // showC: true,
            longCommentShow: true,                   //初始长评论显示状态
            shortCommentShow: false,                 //初始短评论显示状态
        }
    },
    computed: {
        shafaHeight() {
            return document.documentElement.clientHeight - 130 + 'px';
        }
    },
    methods: {
       attachImageUrl,
       fetchData() {
            const that = this;
            let id = this.$route.params.id;
            // 新闻对应长评论查看
            this.$http({
                url: `/api/4/story/${id}/long-comments`,
                success(res){
                  // console.log(res);
                  that.longComments = res;
                }
            });

            // 新闻对应短评论查看
            this.$http({
                url: `/api/4/story/${id}/short-comments`,
                success(res){
                  // console.log(res);
                  that.shortComments = res;
                }
            });
       },
       goBack() {
           window.history.length > 1 ? this.$router.go(-1) : this.$router.replace('/');
           return false;
       },
       goBackFunc() {
           this.$router.go(-1);
           return false;
       },
       // 是否显示长评论
       toggleLongComment() {
           this.longCommentShow = !this.longCommentShow;
       },
       // 是否显示短评论
       toggleShortComment() {
           this.shortCommentShow = !this.shortCommentShow;
       }
    },
    /*
    // 这一部分的代码，直接可以用 activated 生命周期来替代
    watch: {
        '$route' (to, from){
            // console.log(to, from);
            // 表示去评论组件的时候，请求数据
            if(to.name=='comment'){
               this.fetchData();
            }            
        }
    },
    */
    created() {
        const that = this;
        // console.log('created');
        // 如果在当前路由刷新，就会后退或重定向到首页路由      
        /* if(!this.$store.state.comments){
            this.goBack();
            return false;
        } */

    },
    // keep-alive 组件激活时调用。
    activated() {
        // console.log('comment组件被激活了！');
        // 如果在当前路由刷新，就会后退或重定向到首页路由      
        if(this.$store.state.comments === ''){
            this.goBack();
            return false;
        }

        this.longCommentShow = true;             
        this.shortCommentShow = false;

        this.fetchData();
        
    },
    // keep-alive 组件停用时调用。
    deactivated() {
        // console.log('comment组件停用时触发');
    },
    filters: {
        showTime(value) {
            function addZero(index){
                return index < 10 ? '0' + index : index;
            }
            let time = new Date(value*1000),
                month = addZero(time.getMonth() + 1),
                date = addZero(time.getDate()),
                hour = addZero(time.getHours()),
                minute = addZero(time.getMinutes());
            return `${month}-${date} ${hour}:${minute}`;
        }
    }
}
</script>
<style lang="scss" scoped>
  @import '../../common/scss/base.scss';
  .comment{
      padding-top: 50px;
      background: #fff;
      position: absolute;
      top:0;
      bottom: 0;
      width: 100%;
      max-width: 640px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

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
		z-index: 10;
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
                    padding-left: 14px;
                    font-size: 20px;

                    &.icon-editor{
                        font-size: 22px;
                    }

                    .text{
                        font-size: 14px;
                        padding-left: 2px;
                        margin-top: -2px;
                    }
                }
            }
        }
        
      }

      .comment-list{
          .commentHeader{
              position: relative;
              .text{
                display: inline-block;
                width: 100%;
                height: 40px;
                padding: 0 15px;
                line-height: 40px;
                font-size: 14px;
                box-sizing: border-box;
              }
              .arrow{
                position: absolute;
                top: 0;
                right: 0;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
              }
          }
          .long_comment{
              .shafa-tip{
                  font-size: 14px;
                  color: #B2B2B2;

                    display:-webkit-box;
                    display:-moz-box;
                    display:-ms-flexbox;
                    display:-webkit-flex;
                    display:flex;
                    flex-direction: column;
                    -webkit-box-pack: center;
                    -moz-justify-content: center;
                    -webkit-justify-content: center;
                    justify-content:center;
                    -webkit-box-align: center;
                    -moz-align-items: center;
                    -webkit-align-items: center;
                    align-items:center;

                    .iconfont{
                        font-size: 60px;
                        margin-top: -20px;
                        margin-bottom: 10px;
                    }
              }
          }
          .comment-item{
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            /* border-bottom: 1px solid #ccc; */
            position: relative;           

            .author{
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

                height: 50px;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                    .image{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    padding-left: 10px;
                    font-size: 14px;
                    font-weight: bold;
                }
                .favour{
                    font-size: 12px;
                    color: #bebebe;
                }
            }
            .comment-text{
                padding: 0 4px 0 40px;
                .long-text{
                    text-align: justify;
                    font-size: 16px;
                    line-height: 22px;
                }
                .time{
                    display: block;
                    margin: 20px 0;
                    font-size: 12px;
                    color: #bebebe;
                }
            }
          }
      }
      
      
  }
      
</style>


