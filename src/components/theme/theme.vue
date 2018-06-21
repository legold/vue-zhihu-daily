<template>
    <div id="theme" class="theme" :class="{'home-hidden': homeHidden}">
		<header class="header">
			<i class="iconfont icon-menu" @click="showSideBar"></i>
			<div class="home">
				<span class="text" v-if="themeItem">{{ themeItem.name }}</span>
			</div>
			<div class="more">
				<i class="iconfont icon-plus-circle"></i>
			</div>
		</header>
		<!-- <sidebar ref="sidebar" @homeHidden="homeHidden=$event"></sidebar> -->
		<sidebar ref="sidebar"></sidebar>
        <section class="themeWrap" v-if="themeItem">
            <figure class="themeHead">
                <span class="title">{{ themeItem.description }}</span>
                <!-- <img :src="themeItem.thumbnail" class="image"> -->
                <img v-if="themeData" :src="themeData.background" class="image">
                <div class="mask"></div>
            </figure>
            <div class="theme-article-list" v-if="themeData">
                <div class="editor">
                    <span class="text">主编</span> 
                    <div class="avatar"><img :src="themeData.editors[0].avatar" class="image"></div>
                </div>
                <div class="theme-article-item" v-for="item in themeData.stories" :key="item.id" @click="goDetail(item.id)">
                    <span class="text">{{ item.title }}</span>
                    <div class="image-box" v-if="item.images && item.images.length"><img :src="item.images[0]" class="image"></div>
                </div>
            </div>
        </section>
		<!-- <dropload></dropload> -->
	</div>
</template>
<script>
import articleList from '@/components/articleList/articleList'
// import dropload from '../dropload'
import { mapGetters } from 'vuex'

export default {
  name: 'theme',
  data() {
      return {
          themeData: null
      }
  },
  computed: {
      /* homeHidden() {
          return this.$store.state.homeHidden
      }, */
      ...mapGetters([
          'homeHidden',
          'currentIndex',
          'themeList'
      ]),
      themeItem() {
          return this.themeList[this.currentIndex];
      }
  },
  components: {
      articleList,
      // dropload,
      sidebar: () => import('../sidebar'),   // 异步加载这个组件，只在需要的时候加载  
  },
  methods: {
      // 父组件调用子组件的方法，来控制子组件显示
      showSideBar() {			
         this.$refs.sidebar.open();
         // 改变全局状态 homeHidden, 发射
         this.$store.commit('SET_HOME_HIDDEN', true);
      },
      fetchData(id) {
         const that = this;
         id = id || this.$route.params.id;
         // console.log(id);
         // 请求主题数据
         this.$http({
            url: `/api/4/theme/${id}`,
            success(res) {
                // console.log(res);
                that.themeData = res;
            }
         });
      },
      goDetail(id){
          // console.log(id);
          // this.$router.push({name: 'detail', params: {id}});
          this.$router.push({path: `/detail/${id}`});
      }
  },
  watch: {
      // 如果路由有变化，会再次执行该方法
      // '$route': 'fetchData'
  },
  beforeRouteUpdate(to, from, next) {
      // console.log(to, from, to.params.id, this.$route.params.id);
      this.fetchData(to.params.id);
      next();
  },
  created() {      
      // this.fetchData();
  },
  /* beforeRouteEnter (to, from, next) {
    next();
    console.log(to, from);
  }, */
  activated() {
      // console.log('theme组件被激活');
      this.$nextTick(() => {
          window.scrollTo(0, 0);
      });
      
      // 请求数据的操作，如果在这里执行，就表示，组件被激活后，就重新再次请求数据，用以实时显示最新的文章
      // 如果放在 created 函数里执行，就表示在下次刷新页面之前，本次单页面，本主题不会实时刷新，因为激活后读取的是缓存
      // 视情况而定，如果不会更新或极少更新的情况下，就在 created 中执行，所以要讲究时效性，就在 activated 中执行
      this.fetchData();

  },
  deactivated() {
      // console.log('theme组件被停用');
  }
}
</script>
<style lang="scss" scoped>
.theme{
    padding-top: 50px;
    background: #F3F3F3;

    &.home-hidden{
        height: 100vh;
        overflow: hidden;
    }

    .iconfont{
        font-size: 22px;
    }

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
		padding: 0 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;

		.home{
			-webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		    padding-left: 20px;
		}

		.more{
			i{
			    width: 30px;
			    text-align: right;
			    display: inline-block;
			}
		}
	}

    .themeWrap{
        .themeHead{
            position: relative;
            width: 100%;
            overflow: hidden;
            .title{
                position: absolute;
                bottom: 20px;
                padding: 0 20px;
                line-height: 24px;
                font-size: 20px;
                color: #fff;
                z-index: 2;
            }
            .image{ width: 100%; }
            .mask{
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to top,rgba(0,0,0,.7),transparent);
                z-index: 1;
            }

        }
        @media (max-width: 320px) {
            .themeHead {
                height:200px
            }
        }

        @media (min-width: 320px) and (max-width:520px) {
            .themeHead {
                height:220px
            }
        }

        @media (min-width: 520px) and (max-width:640px) {
            .themeHead {
                height:240px
            }
        }

        @media (min-width: 640px) {
            .themeHead {
                height:300px
            }
        }


        .theme-article-list{
            padding: 0 10px;
            padding-bottom: 10px;
            .editor{
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

                width: 100%;
                height: 50px;
                .text{ font-size: 16px; }
                .avatar{
                    -webkit-box-flex: 0;
                    -ms-flex: 0 0 40px;
                    flex: 0 0 40px;
                    text-align: center;
                    .image{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
            }
            .theme-article-item{
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
                width: 100%;
                min-height: 60px;
                padding: 10px 14px;
                margin-top: 8px;
                background: #fff;
                border-radius: 3px;
                box-shadow: 0px 1px 1px #CBCBCB;

                .text{
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    line-height: 22px;
                    font-size: 17px;
                }
                .image-box{
                    -webkit-box-flex: 0;
                    -ms-flex: 0 0 auto;
                    flex: 0 0 auto;
                    height: 75px;
                    max-width: 75px;
                    overflow: hidden;
                    .image{ height: 100%; }
                }
            }
        }

    }
}
</style>


