import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAllPublications(params: any): Promise<ListResult> {
    return http.request({
      headers: {
        "Content-Type": "multipart/form-data",
        "token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIxIjoiYWRtaW4iLCJleHAiOjE3MjAzMTg1NjR9.c_knRNp5dROn5rxaQQqDVyqhAJb_ogUa--UWJPRubjs',
      },
      url: "/article/get-all",
      method: "get",
      params
    });
}