<template>
	<div class="swiper">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="item in topStories" :key="item.id" @click="goDetail(item.id)">
		        	<div class="content">
		        		<img class="loadImg" :src="item.image" @error="$event.target.src = attachImageUrl(item.image)" alt="" />
		        		<span class="title">{{ item.title }}</span>
		        	</div>
		        	<div class="mask"></div>
		        </div>
		        <!-- <div class="swiper-slide">Slide 1</div>
		        <div class="swiper-slide">Slide 2</div>
		        <div class="swiper-slide">Slide 3</div> -->
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		    
		    <!-- 如果需要导航按钮 -->
		    <!-- <div class="swiper-button-prev"></div>
		    <div class="swiper-button-next"></div> -->
		    
		    <!-- 如果需要滚动条 -->
		    <!-- <div class="swiper-scrollbar"></div> -->
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper'
	import attachImageUrl from '../../static/js/attachImageUrl.js'
	import { Indicator } from 'mint-ui'

	export default {
		name: 'swiper',
		props: ['topStories'],
		data() {
			return {
				mySwiper: null,  // 轮播图实例
			}
		},
		methods: {
			attachImageUrl,			
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
			/*
			attachImageUrl(srcUrl) {
				if(srcUrl !== undefined){
					return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
				}
			}
			*/
		},
		mounted() {
			this.mySwiper = new Swiper ('.swiper-container', {
			    loop: true,
			    autoplay: {
			    	delay: 3500,
			    	disableOnInteraction: false,
			    },

			    // 如果需要分页器
			    pagination: {
			      el: '.swiper-pagination'
			    },
			    // 如果需要前进后退按钮
			    // nextButton: '.swiper-button-next',
			    // prevButton: '.swiper-button-prev',
			    // 如果需要滚动条
			    // scrollbar: '.swiper-scrollbar',
			});
			// console.log('挂载');
		},
		activated() {
			// console.log('swiper被激活');
			// 重启自动播放
			this.mySwiper.autoplay.start();
		},
		deactivated() {
			// console.log('swiper被停用');
			// 停止自动播放
			this.mySwiper.autoplay.stop();
		},
	}
</script>
<style lang="scss">
 @import '../../static/css/swiper.min.css';
 .swiper-container {
    width: 100%;
    background: #fff;
    position: relative;

    .content {
	    font-size: 15px;
	    color: #616466;

		.loadImg{
			margin-top: -30%;
		}
	    .title{
	    	position: absolute;
		    bottom: 24px;
		    left: 0;
		    padding: 0 20px;
		    font-size: 15px;
		    line-height: 24px;
		    color: #fff;
		    z-index: 2;
	    }
	}
	.mask{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: linear-gradient(0deg,rgba(0,0,0,.7),transparent);
	    z-index: 1;
	}

	.swiper-pagination-bullet {
	    width: 6px;
	    height: 6px;
	    display: inline-block;
	    border-radius: 100%;
	    background: rgba(255,255,255, .333);
	    opacity: 1;
	}
	.swiper-pagination-bullet-active {
	    background: rgba(255,255,255, 1);
	}
	.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
	    margin: 0 2px;
	}
 }
 @media (max-width: 320px) {
    .swiper .swiper-container {
        height:180px
    }
 }

 @media (min-width: 320px) and (max-width:520px) {
    .swiper .swiper-container {
        height:200px
    }
 }

 @media (min-width: 520px) and (max-width:640px) {
    .swiper .swiper-container {
        height:220px
    }
 }

 @media (min-width: 640px) {
    .swiper .swiper-container {
        height:280px
    }
 }
</style>