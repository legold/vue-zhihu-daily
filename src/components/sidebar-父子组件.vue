<template>
    <div class="sidebarBox">
        <transition name="fold">
           <div class="sidebar">
              sidebar
              <button @click="hideSideBar">隐藏sidebar</button>
           </div>
        </transition>
        <transition name="fade">
           <div class="mask"></div>
        </transition>
        
    </div>
</template>
<script>
export default {
    name: 'sidebar',
    props: ['sidebarStatus'],
    data() {
        return {
            // showSideBar: false
        }
    },
    methods: {
        hideSideBar() {
            // 隐藏侧边栏，向上派发事件
            this.$emit('hideSideBar', false);
        }
    },
    // 异步组件， 每次渲染该组件时都会触发
    created() {
        console.log(111);
    },
    // 组件被激活的时候，这个就不会被触发了，因为它被没有被添加到路由组件中
    /*
    activated() {
        console.log(222);
    }
    */
}
</script>
<style scoped>
 .sidebar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    height: 100%;
    width: 230px;
    background-color: rgb(35, 42, 48);
    transform: translate3d(0, 0, 0);

    transition: all 0.5s;

    /* &.fold-enter-active, &.fold-leave-active{
        
    }  
    &.fold-enter, &.fold-leave-active{
        transform: translate3d(-100%, 0, 0);
    } */
        
  }
  .sidebar.fold-enter, .sidebar.fold-leave-active{
      transform: translate3d(-100%, 0, 0);
  }
</style>


