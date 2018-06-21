// https://github.com/biaodigit/vue-news

export default function (srcUrl){
    if(srcUrl !== undefined){
        return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
    }
}