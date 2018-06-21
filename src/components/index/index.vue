<template>
	<div id="index" class="index" :class="{'home-hidden': homeHidden}">
		<header class="header">
			<i class="iconfont icon-menu" @click="showSideBar"></i>
			<div class="home">
				<span class="text">首页</span>
			</div>
			<div class="more">
				<i class="iconfont icon-bell-fill"></i>
				<i class="iconfont icon-more_android_light"></i>
			</div>
		</header>
		<!-- <sidebar ref="sidebar" @homeHidden="homeHidden=$event"></sidebar> -->
		<sidebar ref="sidebar"></sidebar>
        <swiper v-if="indexData" :top-stories="indexData['top_stories']" ref="swiper"></swiper>
		<article-list 
		    v-for="(item, index) in indexList"
			:key="index"
			:article-item="item"	
			:article-index="index"></article-list> <!-- v-if="indexData" :article-data="indexData"  -->
		<dropload :droploadStatus="droploadStatus" @load="loadMore"></dropload>
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
			   indexList: [],
			   // showSideBar: false
			   // homeHidden: false,
			   loadingShow: true,   // 数据加载的提示
			   noNote: false,  // 默认有更多数据
			   page: 1,  // 第一页
			   canLoadMore: true,  // 默认可以加载更多
			   droploadStatus:2,  // loading 初始状态  1 点击查看更多  2 加载中  3无更多内容
			   onLoadingMore: false,  // （默认否）表示是否正在加载更多数据请求中，当前请求还没完成的时候，多次触发 

			   count: 1,  // 0 今天  -1 昨天  -2 前天 类推
			}
		},
		computed: {
			homeHidden() {
				return this.$store.state.homeHidden;
			}
		},
		methods: {
			// 父组件调用子组件的方法，来控制子组件显示
			showSideBar() {		
				
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// return false;
				this.$refs.sidebar.open();
				// 改变全局状态 homeHidden, 发射，提交载荷
				this.$store.commit('SET_HOME_HIDDEN', {
				   homeHidden: true,
				   homeScrollTop: scrollTop
				});
			},
			// 获取首页列表数据
            getList(type) {
			   let that = this;
			   // 传递 type 参数，设置为1 就表示第一次加载，不传 type 表示加载国王消息
			   if(type){
                  that.$http({
					 url: '/api/4/news/latest',
					 success(res){
						// console.log(res);
						that.indexList.push(res);
						that.indexData = res;
						that.droploadStatus = 1;							
					 }
				  });
			   }else{
				  let dateStr = this.GetDateStr(--this.count);
				  // 第一次 count 是 1， dateStr 是获得今天的日期，那么 before/今天  就是昨天， 以此类推
				  // console.log(dateStr);
				  that.$http({
					 url: `/api/4/news/before/${dateStr}`,
					 success(res){
						// console.log(res);
						
						that.onLoadingMore = false;  // 表示当前加载更多数据请求已经完成

						if(res.date < '20130520'){
							// 知乎日报的生日为 2013 年 5 月 19 日，若 before 后数字小于 20130520 ，只会接收到空消息
							that.canLoadMore = false;
							that.droploadStatus = 3;
						}else{
							that.indexList.push(res);
							that.droploadStatus = 1;							
						}
                   
					 }
				  }); 
			   }
			},
			// 加载更多
			loadMore() {
				const that = this;
				// 下面的条件会判断当前有没有开始加载更多的请求，如果有，就不会再次执行
				if(this.indexList.length && this.canLoadMore && !this.onLoadingMore){
					// console.log('开始加载更多数据了，更多数据调用接口');  					
					//console.log('可以加载更多了！');
					this.onLoadingMore = true;  // 表示正在请求中
					// 变为加载中状态
					this.droploadStatus = 2;
					this.$nextTick(() => {
						this.getList();
					});
				}							
			},
			// S获取前天、昨天、今天、明天、后天的时间
			GetDateStr(AddDayCount) {
				function check(index){
					return index < 10 ? '0' + index : index;
				}
				var dd = new Date();
				dd.setDate(dd.getDate()+AddDayCount);  //获取AddDayCount天后的日期
				var y = check(dd.getFullYear());
				var m = check(dd.getMonth()+1);  //获取当前月份的日期
				var d = check(dd.getDate());
				return y+""+m+""+d;
			}
			
		},
		created() {	        
			this.getList(1);			
			// console.log(this.$route);			
		},
		mounted() {
			// 下面这个访问到的是 undefined，原因是 sidebar 是异步加载的，此时 sidebar还没有渲染，所以访问不到
			// 还有一种情况就是 组件还没渲染填充完毕，获取的也是 undefined
			// console.warn(this.$refs.sidebar);
			// console.warn(this.$refs.swiper);
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

		&.home-hidden{
			height: 100vh;
			overflow: hidden;
		}
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