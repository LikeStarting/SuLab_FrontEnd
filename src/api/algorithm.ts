import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function CallAlgorithmApi(data: any): Promise<ListResult> {
    return http.request({
      headers: {
        "Content-Type": "multipart/form-data",
        "token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIxIjoiYWRtaW4iLCJleHAiOjE3MTk3MzYzOTN9.ibFYAeipK7Vv6t8ehLq89tb_NmGqn0WN5sp-Zu9MNYk',
      },
      url: "/algorithm/dc",
      method: "post",
      data
    });
}