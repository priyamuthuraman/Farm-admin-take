import moment from "moment";
export const retail_excel_columns = (object) => {
  let tmp = [];
  try {
    for (let index = 0; index < object.length; index++) {
      tmp.push({
        Sl_No: index + 1,
        Customer_name: object[index]?.user?.first_name,
        Customer_email: object[index]?.user?.emailid,
        Customer_mobile: object[index]?.user?.mobile_number,
        Address: object[index]?.billing_address.address,
        Order_id: object[index]?.order_id,
        Invoice_no: object[index]?.invoice_no,
        Payment_method: object[index]?.payment?.generic_name,
        Ordered_At: moment(object[index]?.createdAt).format("LL"),
      });
    }
    return tmp;
  } catch (error) {
    return [];
  }
};

export const wholesale_excel_columns = (object) => {
  let tmp = [];
  try {
    for (let index = 0; index < object.length; index++) {
      tmp.push({
        Sl_No: index + 1,
        Customer_name: object[index]?.customer?.name,
        Customer_email: object[index]?.customer?.email_id,
        Customer_mobile: object[index]?.mobile_number,
        GST_no: object[index]?.customer?.GST_number,
        Address: object[index]?.address,
        Order_id: object[index]?.order_no,
        Payment_method: object[index]?.generic?.generic_name,
        Ordered_At: moment(object[index]?.createdAt).format("LL"),
      });
    }
    return tmp
  } catch (error) {
    return [];
  }
};

// {
//            "id": 15,
//            "customer_id": 9,
//            "address": "no:19/14 1st street nethaji nagar",
//            "mobile_number": 9094730085,
//            "order_no": "FTW10000",
//            "payment_status_id": 1015,
//            "remarks": "",
//            "isActive": 1,
//            "isDeleted": 0,
//            "createdAt": "2023-03-17T08:39:23.000Z",
//            "updatedAt": "2023-03-17T08:39:34.000Z",
//            "wholesale_order_products": [
//                {
//                    "id": 5,
//                    "whole_sale_order_id": 15,
//                    "product_id": 90,
//                    "base_price": 356,
//                    "actual_price": 375,
//                    "quantity": 4000,
//                    "gst": 5,
//                    "igst": 19,
//                    "cgst": "9.5",
//                    "sgst": 10,
//                    "isActive": 1,
//                    "isDeleted": 0,
//                    "createdAt": "2023-03-17T08:39:34.000Z",
//                    "updatedAt": "2023-03-17T08:39:34.000Z",
//                    "product": {
//                        "id": 90,
//                        "name": "Pure Cow Ghee",
//                        "orginal_image": "/storage/product/427e539537b54317ae7e309e48755adc.jpeg",
//                        "description": "Pure Cow Ghee",
//                        "quantity": 500,
//                        "base_price": 356,
//                        "actual_price": 375,
//                        "category_id": 11,
//                        "stock": 30,
//                        "subcategory_id": 18,
//                        "gst": 5,
//                        "hsn": "04059020",
//                        "unit_id": 1001,
//                        "isActive": 1,
//                        "isDeleted": 0,
//                        "createdAt": "2023-03-17T03:16:56.000Z",
//                        "updatedAt": "2023-03-17T03:16:56.000Z"
//                    }
//                }
//            ],
//            "generic": {
//                "id": 1015,
//                "generic_name": "Paid",
//                "generic_flag": "PAYMENT_STATUS",
//                "createdAt": "2023-03-15T16:14:07.000Z",
//                "updatedAt": "2023-03-15T16:14:07.000Z"
//            },
//            "customer": {
//                "id": 9,
//                "name": "Rojith p",
//                "customer_code": "eefaf",
//                "address": "no:19/14 1st street nethaji nagar",
//                "contact_number": 9094730085,
//                "status_id": 1009,
//                "email_id": "rojith.zigainfotech@gmail.com",
//                "description": "awdawd",
//                "GST_number": "awdawd",
//                "isActive": 1,
//                "isDeleted": 0,
//                "state_id": 4035,
//                "country_id": 101,
//                "city_id": 131517,
//                "createdAt": "2023-03-14T07:49:25.000Z",
//                "updatedAt": "2023-03-14T07:49:25.000Z",
//                "state": {
//                    "id": 4035,
//                    "name": "Tamil Nadu",
//                    "country_id": 101,
//                    "country_code": "IN"
//                }
//            }
//        }
