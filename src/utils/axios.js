import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://47.96.21.88:8086'

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