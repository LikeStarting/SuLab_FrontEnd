import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAllMember(params?: any): Promise<ListResult> {
    return http.request({
      url: "/member/get-all",
      method: "get",
      params
    });
}