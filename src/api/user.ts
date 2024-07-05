import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    img: Array<any>;
}

export function getVierificationCodeApi(params?: object): Promise<ListResult> {
    return http.request({
      url: "/captcha/image",
      method: "get",
      params
    });
}

export function login(params: object): Promise<ListResult> {
  return http.request(
    {
      url: '/login/password',
      method: 'POST',
      params,
    },
    // {
    //   isTransformResponse: false,
    // },
  )
}

export function register(params?: object): Promise<ListResult> {
  return http.request({
    url: "/register/email",
    method: "get",
    params
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
    method: 'POST',
  })
}