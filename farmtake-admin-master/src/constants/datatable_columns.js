import moment from "moment";
import {
  GetInvoiceUrl,
  rootUrl,
  updateOrderStatusUrl,
} from "../service/api.url";
import axiosDefault from "../service/api.config";
import { toast } from "react-toastify";

const status = [
  {
    id: 1007,
    generic_name: "Pending",
    generic_flag: "DELIVERY_STATUS",
    createdAt: "2023-02-24 10:57:06",
    updatedAt: "2023-04-28 15:10:04",
  },
  {
    id: 1008,
    generic_name: "Delivered",
    generic_flag: "DELIVERY_STATUS",
    createdAt: "2023-02-24 10:57:35",
    updatedAt: "2023-03-07 17:28:19",
  },
];

export const order_columns = [
  {
    name: "id",
    selector: (row, index) => {
      return index + 1;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Order Id",
    selector: (row, index) => {
      return (
        <a
          href={rootUrl + GetInvoiceUrl + row?.order_id}
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {row?.order_id}
        </a>
      );
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Invoice No",
    selector: (row, index) => {
      return row?.invoice_no;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Name",
    selector: (row, index) => {
      return row?.user?.first_name + " " + row?.user?.last_name;
    },
    style: {
      textAlign: "center",
    },
  },

  {
    name: "Product",
    selector: (row, index) => {
      var product = row?.ordered_products;

      return (
        <>
          {product?.map((prod, i) => {
            return <img width={40} src={rootUrl + prod?.orginal_image} />;
          })}
        </>
      );
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "State",
    selector: (row, index) => {
      return row?.billing_address?.state?.name;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "City",
    selector: (row, index) => {
      return row?.billing_address?.city?.name;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Payment Status",
    selector: (row, index) => {
      return row?.payment?.generic_name;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Status",
    selector: (row, index) => {
      return (
        <select
          defaultValue={row?.delivery?.id}
          onChange={async (e) => {
            let response = await axiosDefault.post(updateOrderStatusUrl, {
              status_id: e.target.value,
              id: row?.id,
            },{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            });

            if(response.status==200){
              toast.success(response.data?.message)
            }
          }}
          className="form-control"
        >
          {status.map((value) => {
            return <option value={value?.id}>{value.generic_name}</option>;
          })}
        </select>
      );
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Total price",
    selector: (row, index) => {
      let product = row.ordered_products;
      let total = 0;

      product.forEach((val) => {
        total += val.qty * val.actual_price;
      });

      return <span>₹{total}</span>;
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Ordered Date",
    selector: (row, index) => {
      return moment(row?.createdAt).format("LL");
    },
    style: {
      textAlign: "center",
    },
  },
  {
    name: "export",
    
    // Export

    style: {
      textAlign: "center",
    },
  },
];



export const whole_sale_products_column = [];
