import { useQuery } from "react-query";
import { retailUserQueryKey } from "./key";
import axiosDefault from "../service/api.config";
import { getRetaliCustomerUrl } from "../service/api.url";

export default function useGetRetailUserQuery(setData) {
  return useQuery({
    queryKey: retailUserQueryKey,
    queryFn: async () => {
      let response = await axiosDefault.get(getRetaliCustomerUrl);
      return response;
    },
    onSuccess: (data) => {
      setData(data.data.message);
    },
  });
}
