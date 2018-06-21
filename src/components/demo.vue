<template>
	<div id="demo">
     <button @click="func">弹窗</button>
     <mt-button type="primary" size="large" @click.native="func">弹窗</mt-button>
     demo
	</div>
</template>

<script>
import { Indicator } from 'mint-ui'

export default {
  name: 'demo',
  data (){
  	 return {
	    
	   }
  },
  components: {
  	 
  },
  computed: {
  	 
  },
  methods: {
  	func(e){
       Indicator.open({
          text: '加载中',
          spinnerType: 'fading-circle'
       });
       setTimeout(() => {
          Indicator.close();
       }, 2000);
    }
  },
  created(){
     const that = this;
     // console.log(124);
  },
}
</script>

<style scoped>
  a{
     color: #f60;
     border: 1px solid #333;
     display: inline-block;
     padding: 10px 20px;
     margin-right: 10px;
     border-radius: 100px;
     text-decoration: none;
     background: #eee;
  }
</style>