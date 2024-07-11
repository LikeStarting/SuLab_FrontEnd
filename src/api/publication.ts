import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAllPublications(params: any, token: string): Promise<ListResult> {
    return http.request({
      headers: {
        token
      },
      url: "/article/get-all",
      method: "get",
      params
    });
}