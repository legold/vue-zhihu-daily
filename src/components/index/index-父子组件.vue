<template>
	<div id="index" class="index">
		<header class="header">
			<i class="iconfont icon-menu" @click="showSideBar = true"></i>
			<div class="home">
				<span class="text">首页</span>
			</div>
			<div class="more">
				<i class="iconfont icon-bell-fill"></i>
				<i class="iconfont icon-more_android_light"></i>
			</div>
		</header>
		<sidebar v-show="showSideBar" :sidebarStatus="showSideBar" ref="sidebar" @hideSideBar="hideSideBar"></sidebar>
        <swiper v-if="indexData" :top-stories="indexData['top_stories']"></swiper>
		<article-list v-if="indexData" :article-data="indexData"></article-list>
		<dropload></dropload>
		<router-view></router-view>
		<!-- <transition name="move">
		   <router-view class="view"></router-view>
		</transition> -->
	</div>
</template>
<script>
	import swiper from '../swiper'
	import articleList from '@/components/articleList/articleList'
	import dropload from '../dropload'

	export default {
		name: 'index',
		data() {
			return {
			   indexData: null,
			   showSideBar: false
			}
		},
		methods: {
			// 父组件调用子组件的方法，来控制子组件显示
			/* showSideBar() {
				this.$refs.sidebar.open();
			} */
			hideSideBar() {
				this.showSideBar = false;
			}
		},
		created() {
			const that = this;
	        that.$http({
	          url: '/api/4/news/latest',
	          success(res){
	            console.log(res);
	            that.indexData = res;
	          }
	        });
		},
		components: {
			swiper,
			articleList,
			dropload,
			sidebar: () => import('../sidebar'),  // 异步加载这个组件，只在需要的时候加载
		}
	}
</script>
<style lang="scss" scoped>       
    .index{
    	padding-top: 50px;
		background: #F3F3F3;
    }
    .iconfont{
    	font-size: 20px;
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

</style>