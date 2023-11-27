import { useQuery } from "react-query";
import axiosDefault from "../service/api.config";
import { getNotificationUrl } from "../service/api.url";

export default function useNotificationQuery() {
  return useQuery({
    queryKey: "notification",
    queryFn: async () => {
      let response = await axiosDefault.get(getNotificationUrl);
      return response
    },
    refetchInterval:5000,
    select:(resposne)=>{
           
           return resposne.data?.message
    }
  });
}
