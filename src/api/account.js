import service from "../utils/request";
/**
 * 获取验证码
 */
export function GetCode(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/account/code/`,
        data
    })
}

/**
 * 注册
 */
export function Register(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/account/register/`,
        data
    })
}

/**
 * 登录
 */
export function Login(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/account/login/`,
        data
    })
}


/**
 * 登录
 */
export function Forget(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/account/forget/`,
        data
    })
}
/**
 * 获取七牛云 token
 */
 export function GetQiniuToken(data = {}){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}