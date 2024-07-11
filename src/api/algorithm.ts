import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAlgorithmFileExample(params: any, token: string): Promise<any> {
  return http.request({
    headers: {
      token: token
    },
    url: "/algorithm/download",
    method: "get",
    params
  });
}

export function callAlgorithmApi(data: any, token: string): Promise<ListResult> {
    return http.request({
      headers: {
        "Content-Type": "multipart/form-data",
        token
      },
      url: "/algorithm/dc",
      method: "post",
      data
    });
}

export function callAlgorithmWithSingle(data: any, token: string): Promise<ListResult> {
  return http.request({
    headers: {
      token
    },
    url: "/algorithm/dc/single",
    method: "post",
    data
  });
}