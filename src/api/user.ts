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