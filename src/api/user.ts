import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    img: Array<any>;
}

// type ListWithResult = {
//   code: number;
//   message: string;
//   data: object<any>;
// }

export function getVierificationCodeApi(params?: object): Promise<ListResult> {
    return http.request({
      url: "/captcha/image",
      method: "get",
      params
    });
}

export function getEmailCaptcha(params?: object): Promise<ListResult> {
  return http.request({
    url: "/captcha/email",
    method: "get",
    params
  });
}

export function login(params: object): Promise<ListResult> {
  return http.request(
    {
      url: '/login/password',
      method: 'post',
      data: params,
    },
    // {
    //   isTransformResponse: false,
    // },
  )
}

export function register(params?: object): Promise<ListResult> {
  return http.request({
    url: "/register/email",
    method: "post",
    data: params
  });
}

export function getUserInfo(params?: object): Promise<ListResult> {
    return http.request({
      url: "/captcha/image",
      method: "get",
      params
    });
}

export function logout(): Promise<ListResult> {
  return http.request({
    url: '/logout',
    method: 'post',
  })
}