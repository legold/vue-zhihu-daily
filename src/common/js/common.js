export function transNumFormat(num){
    // 评论或点赞超过 1000 转成 1k，超过1w转成 1w
    let oldNum = num*1,
        newNum,
        dotIndex;
    
    if(oldNum<1000){
        return oldNum;
    }else if(oldNum<10000){
        newNum = (oldNum / 1000).toString();
        dotIndex = newNum.indexOf('.');
        if(dotIndex > 0){
            return newNum.substring(0, dotIndex + 2) + 'k';
        }else{
            return newNum + 'k';
        }
    }else{
        newNum = (oldNum / 10000).toString();
        dotIndex = newNum.indexOf('.');
        if(dotIndex > 0){
            return newNum.substring(0, dotIndex + 2) + 'w';
        }else{
            return newNum + 'w';
        }
    }
}