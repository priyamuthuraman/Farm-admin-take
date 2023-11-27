import { useQuery } from "react-query";
import { getWholeSaleCustomerUrl } from "../service/api.url";
import { wholeSaleQueryKey } from "./key";
import axiosDefault from "../service/api.config";

export default function useGetWholeCustomerQuery(setData) {
  return useQuery({
    queryKey: wholeSaleQueryKey,
    queryFn: async () => {
      let response = await axiosDefault.get(getWholeSaleCustomerUrl);
      return response;
    },
    onSuccess: (data) => {
      setData(data);
    },
    select: (data) => {
      return data.data.message;
    },
  });
}
