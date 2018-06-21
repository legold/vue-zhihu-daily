
import * as types from './mutation_types'

const moduleA = {
   state: {
      name: 'huanglei',
     	num: 1,
     	count: 20,
     	sum: 0,
     	quality: 10,
      show: true,
      currentThemeId: 5,  // 当前主题 id
   },
   mutations: { // 只能是同步操作
	   inc: state => state.count++,
	   dec: state => state.count--,
	   increment (state){
	   	 state.num++;
	   },
	   add (state, n){
        state.sum += n;
        state.count += n;
	   },
	   beStrong (state, payload){
	   	 state.quality += payload.amount
	   },
     // 增加当前 count
     [types.ADD_COUNT_ASYNC](state, count){
        state.count += count;
     },
     [types.ADD_COUNT_ASYNC_OBJ](state, count){
         state.count += count;
     },
     // 改变当前主题 id
     [types.CHANGE_CURRENT_THEME_ID](state, id){
         state.currentThemeId = id;
     }
      
   },
   actions: {  // 可以有异步操作
      // 1，actions 的参数是 store 对象,而 getters 和 mutations 的参数是 state .
      // 2，actions 和 mutations 还可以传第二个参数,具体看vuex官方文档
      // 3，getters/mutations/actions 都有对应的map,如: mapGetters , 具体看vuex官方文档
      // 4，模块内部如果怕有命名冲突的话,可以使用命名空间, 具体看vuex官方文档
      // 5，vuex 其实跟 vue 非常像,有data(state),methods(mutations,actions),computed(getters),还能模块化.
      increment ({commit}){
      	 setTimeout(() => {
            commit('inc');
            console.log('异步请求，提交的是 mutations');
          }, 2000);
      },
      addCountAsync ({commit}, count){
          commit(types.ADD_COUNT_ASYNC, count);
      },
      addCountAsyncObj ({commit}, payload){
          commit(types.ADD_COUNT_ASYNC_OBJ, payload.count);
      },
      // actions 提交载荷
      changeCurrentThemeId ({commit}, id){
          commit(types.CHANGE_CURRENT_THEME_ID, id);
      }
   },
   getters: {
      not_show: state => !state.show,
      getReverseName: state => {
         // vuex其实超简单,喝完这3步,还有3步
         // https://blog.csdn.net/linminghe/article/details/80387946
         return state.name.split('').reverse().join('');
      }
   }
}
export default moduleA