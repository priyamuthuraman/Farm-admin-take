import { useQuery } from "react-query";
import axiosDefault from "../service/api.config";

export default function useGetDashboardQuery(setDashboard) {
  return useQuery({
    queryKey: "getdashboard",
    queryFn: async function () {
      let response = await axiosDefault.get("/api/dashboard");
      return response;
    },
    select: (response) => {
      return response.data?.message;
    },
  });
}
