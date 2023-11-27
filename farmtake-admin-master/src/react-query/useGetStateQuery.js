import { useMutation, useQuery } from "react-query";
import { stateQueryKey } from "./key";
import axiosDefault from "../service/api.config";
import { getStateUrl } from "../service/api.url";

export default function useGetStateQuery(setState) {
  return useMutation({
    mutationKey: stateQueryKey,
    mutationFn: async (value, meta) => {
      let response = await axiosDefault.get(getStateUrl + value);
      return response;
    },
    onSuccess: (data) => {
      setState(data.data?.message);
    },
  });
}
