import Http from './http'

// 默认 axios 实例请求配置
const configDefault = {
    // headers: {
    //   "Content-Type": ContentTypeEnum.FORM_URLENCODED
    // },
    timeout: 6000,
    baseURL: '/api',
    data: {}
};

export const http = new Http(configDefault)