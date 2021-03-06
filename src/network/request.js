import axios from 'axios'
export function request(config){
  //创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })

  //2.1 axios的拦截器 请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })

  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err =>{
    console.log(err);
  })

  //发送请求
  return instance(config)
}