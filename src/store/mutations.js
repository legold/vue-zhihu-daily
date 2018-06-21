import * as types from './mutation_types'

export default {
    // 添加详情页底部状态到数组
    [types.STORY_EXTRA](state, extra){
        /*
        state.comments = extra.comments;
        state.long_comments = extra.long_comments;
        state.short_comments = extra.short_comments;
        state.popularity = extra.popularity
        */
        for(let key in extra){
            if(extra.hasOwnProperty(key)){
                state[key] = extra[key];
            }
        }
    },
    // 点击侧边栏列表后，发送当前主题信息到 vuex，因为 theme组件要使用
    [types.SET_THEME_LIST](state, list){
        state.themeList = list;
    },
    // 点击标题栏上的左侧的按钮， homeHidden 设置为true，表示不让侧边栏下层主体滑动，点击侧边栏里的某个主题，释放 homeHidden 为 false， 恢复下部主体滑动
    [types.SET_HOME_HIDDEN](state, obj){
        state.homeHidden = obj.homeHidden;
        if(obj.homeScrollTop)  state.homeScrollTop = obj.homeScrollTop;        
    },
    // 改变 currentIndex
    [types.CHANGE_CURRENT_INDEX](state, num){
        state.currentIndex = num;
    }
}