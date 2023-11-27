import { useQuery } from "react-query";
import { getAllWholeSaleOrderkey } from "./key";
import axiosDefault from "../service/api.config";
import { getRetaliCustomerUrl, wholeSaleOrderUrl } from "../service/api.url";

export default function useWholeSaleOrderQuery() {
  return useQuery({
    queryKey: getAllWholeSaleOrderkey,
    queryFn: async () => {
      let response = await axiosDefault.get(wholeSaleOrderUrl);
      return response;
    },
    select: (response) => {
        // console.log(response.data.message)
      return response.data.message;
    },
  });
}
