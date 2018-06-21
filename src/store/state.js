export default {
    showGoDetailLoading: false,   // 去详情页的时候，提示正在加载中
    
    /* loadMore: {
        noNote: false,  // 默认有更多数据
        canLoadMore: true,  // 默认可以加载更多
        droploadStatus: 2,  // loading 初始状态  1 点击查看更多  2 加载中  3无更多内容
        onLoadingMore: false,  // （默认否）表示是否正在加载更多数据请求中，当前请求还没完成的时候，多次触发 
    }, */    

    comments: '',   // 当前新闻评论总数
    popularity: '',   // 当前新闻点赞数
    long_comments: '',  // 当前新闻长评数
    short_comments: '',  // 当前新闻短评数

    currentIndex: -1,  // 侧边栏的序号
    
    homeScrollTop: 0,  // 主体恢复滑动的时候，自动跳到之前的 scrollTop
    homeHidden: false,   // 侧边栏划出的时候，禁止主页面滑动

    currentIndex: -1,
    themeList: [
        {
            id: '',
            thumbnail: '',
            name: ''
        }
    ]

}