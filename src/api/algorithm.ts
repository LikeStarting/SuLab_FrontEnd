import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAlgorithmFileExample(params: any): Promise<any> {
  return http.request({
    url: "/algorithm/download",
    method: "get",
    params
  });
}

export function callAlgorithmApi(data: any): Promise<ListResult> {
    return http.request({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "/algorithm/dc",
      method: "post",
      data
    });
}

export function callAlgorithmWithSingle(data: any): Promise<ListResult> {
  return http.request({
    url: "/algorithm/dc/single",
    method: "post",
    data
  });
}