import { http } from "@/service";

type ListResult = {
    code: number;
    message: string;
    data: object;
}

export function getAllPublications(params: any): Promise<ListResult> {
    return http.request({
      url: "/article/get-all",
      method: "get",
      params
    });
}

export function getPublicationsBySearch(params: any): Promise<ListResult> {
  return http.request({
    url: "/article/fuzzy-search",
    method: "get",
    params
  });
}