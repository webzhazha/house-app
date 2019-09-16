import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://47.96.21.88:8086'

// 请求拦截器
axios.interceptors.request.use(function(config){
    if(!config.url.endsWith('/')){
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
},function(error){
    return Promise.reject(error)
})

let http ={
    get: '',
    post: ''
}

http.get = function(api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject)=>{
        axios.get(api,params).then(data=>{
            resolve(data.data)
        })
    })
}

http.post = function(api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject)=>{
        axios.post(api,params).then(data=>{
            resolve(data.data)
        })
    })
}

export default http