import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'   // 同级目录
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})