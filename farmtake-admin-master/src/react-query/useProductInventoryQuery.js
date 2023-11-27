import { useMutation } from 'react-query'
import { productInventoryKey } from './key'
import axiosDefault from '../service/api.config'
import { ProductInventoryUrl } from '../service/api.url'

export function useProductInventoryQuery(setTotalRecord, setRecord) {
  return useMutation({
    mutationKey: productInventoryKey,
    mutationFn: async (value) => {
      let response = await axiosDefault.get(
        ProductInventoryUrl + `?limit=${value.limit}&offset=${value.offset}`,
      )
      return response
    },
    onSuccess: (response) => {
      console.log(response.data?.message?.rows)
      setTotalRecord(response.data?.message.count)
      setRecord(response.data?.message?.rows)
    },
  })
}
