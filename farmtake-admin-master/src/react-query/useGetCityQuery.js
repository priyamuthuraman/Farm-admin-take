import { useMutation } from "react-query";
import { cityQueryKey } from "./key";
import axiosDefault from "../service/api.config";
import { getCityUrl } from "../service/api.url";

export default function useGetCityQuery(setCity) {
  return useMutation({
    mutationKey: cityQueryKey,
    mutationFn: async (value, meta) => {
      let response = await axiosDefault.get(getCityUrl + value);
      return response;
    },
    onSuccess: (data) => {
      setCity(data.data?.message);
    },
  });
}
