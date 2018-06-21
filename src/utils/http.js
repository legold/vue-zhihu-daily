// 引入 axios 模块，请求后台接口，封装 请求函数
import http from 'axios';

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}

function callback(opt, res){
	// console.log(res);
	// success          
    if(res.status == 200){
	      // 判断返回的 是 json 格式数据 还是 被序列化的json字符串
	      /*let data = JSON.parse(res.data.replace(/^\(/,'').replace(/\)$/, ''));
	      opt.success && typeof opt.success == 'function' && opt.success({res: res, data: data});*/
	      /* let data = eval('(' + res.data + ')'); */

	      if(typeof res.data === 'string'){
	         // console.log(res.data.charAt(0), typeof res.data.charAt(0));
	         let firstChar = res.data.charAt(0);
	         let data;
	         if(firstChar == '('){
	            data = JSON.parse(res.data.replace(/^\(/,'').replace(/\)$/, ''));
	         }else{
	            data = JSON.parse(res.data);
	         }                 
	         opt.success && typeof opt.success == 'function' && opt.success(data);
	      }else if(typeof res.data === 'object'){
	         opt.success && typeof opt.success == 'function' && opt.success(res.data);
	      }
	      
	      
	}else{
	      opt.fail && opt.fail(res);
	} 
}

function $http(opt){
	opt = opt || {};
	const type = opt.type = (opt.type || 'GET').toUpperCase();
	const params = formatParams(opt.data);
	const contentType = type == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded';

	//如果是get的方式，那么就只能以url后面拼接字符串的形式
    //如果是post的方式，要么用 formdata， 要么写完整形式
   	if(type == "GET"){
   		// get 请求现在我知道的只能通过 加入到 url中传递
        http({
			method: opt.type,
			url: opt.url + '?' + params,   
			headers: {
				'Content-Type': contentType
			} 
		}).then((response) => {
			// success callback
			// opt.success && opt.success(response);
			callback(opt, response);
		}, reject => {			
			// error callback
			console.log('reject');
			opt.fail && opt.fail();
		})
   	}else if(type == 'POST'){
   		http({
			method: opt.type,
			url: opt.url,
			//  data transformRequest headers 配合使用
			data: opt.data,
			transformRequest: [function (data) {
			    // Do whatever you want to transform the data
			    let ret = ''
			    for (let it in data) {
			      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			    }
			    return ret;
			}],
			headers: {
			   'Content-Type': 'application/x-www-form-urlencoded'   // 'application/x-www-form-urlencoded'
			}
		}).then((response) => {			
			// success callback
			// opt.success && opt.success(response);
			callback(opt, response);
		}, reject => {			
			// error callback
			console.log('reject');
			opt.fail && opt.fail();
		})
   	}
}

/*
 使用方式
 import $http from 'http.js';
 $http({
    url: "./TestXHR.aspx",              //请求地址
    type: "POST",                       //请求方式
    data: { name: "super", age: 20 },        //请求参数
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
 });
 */

//export { http };
export default $http;