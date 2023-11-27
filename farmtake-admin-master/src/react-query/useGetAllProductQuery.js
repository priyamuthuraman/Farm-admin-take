import { useQuery } from "react-query";
import { getAllproductUrl } from "../service/api.url";
import { getAllproductKey } from "./key";
import axiosDefault from "../service/api.config";

export default function useGetAllProductQuery() {
  return useQuery({
    queryKey: getAllproductKey,
    queryFn: async () => {
      let response = await axiosDefault.get(getAllproductUrl);
      return response;
    },
    cacheTime:50000,
    initialData:[],

    select: (data) => {
      return data.data?.message;
    },
  });
}
