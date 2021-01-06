import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL; // 填写域名
console.log('BASE_URL',process.env.BASE_URL)
// http request 拦截器
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data) //application/json
        config.headers = {
            'Content-Type': 'application/json'
        }
        // console.log('config :>> ', config);
        if(config.url=="/zutai/write"){
            config.baseURL = 'http://192.168.0.117:8001'
        }
        return config
    },
    error => {
        return Promise.reject(err)
    }
)

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
                data: data
            })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

// 新增组件
// name-组件名称，image-图片地址,data-特征字段
export const addComponent = (data)=>{
    return post('/zutai/component/',data).then(res => res.data)
}

// 更新组件
// id-组件id,name-组件名称，image-图片地址,data-特征字段
export const editComponent = (data)=>{
    return put('/zutai/component/',data).then(res => res.data)
}

// 删除组件
// id-组件id
export const delComponent = (data)=>{
    return del('/zutai/component/',data).then(res => res.data)
}

// 获取所有组件
export const componentList = ()=>{
    return post('/zutai/component/list').then(res => res.data)
}

// 新增页面数据
// deviceId-设备ID name-页面名称 data-页面数据
export const addPage = (data)=>{
    return post('/zutai/componentData/',data).then(res => res.data)
}

// 编辑页面数据
// id-id-本条页面数据记录ID ,name-组件名称，image-图片地址,data-特征字段
export const editPage = (data)=>{
    return put('/zutai/componentData/',data).then(res => res.data)
}

// 删除组件
// id-组件id
export const delPage = (data)=>{
    return del('/zutai/componentData/',data).then(res => res.data)
}
// 获取页面数据记录列表
export const getPageList = ()=>{
    return post(`/zutai/componentData/list`).then(res => res.data)
}

// 获取指定ID页面数据详情
export const getPage = (id)=>{
    return fetch(`/zutai/componentData/id/${id}`).then(res => res.data)
}

// 图片记录新增
export const uploadImg = (data)=>{
    return post(`/zutai/img/`,data).then(res => res.data)
}
// 图片删除 id-本条记录ID
export const delImg = (data)=>{
    return del(`/zutai/img/`,data).then(res => res.data)
}
// 图片列表
export const getImgList = ()=>{
    return post(`/zutai/img/list`).then(res => res.data)
}
// 控制机器
// deviceId-设备id(522) identifier-更改属性名称  value-更改值 
export const controlDevice = (data)=>{
    return post(`/zutai/write`,data).then(res => res.data)
}
// 获取消息列表
export const msgList = ()=>{
    return fetch('/zutai/eventList').then(res => res.data)
}
// 获取事件列表
export const eventList = ()=>{
    return post('/zutai/behavior/list').then(res => res.data)
}





export default axios