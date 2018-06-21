import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './moduleA'
import moduleB from './moduleB'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		a: moduleA,
		b: moduleB
	}
})

// store指的就是 new Vuex.Store 实例化的对象
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态