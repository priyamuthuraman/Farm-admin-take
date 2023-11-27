import { CreateCustomerUrl, CreateWholeSaleUrl } from "./api.url";
import axiosDefault from "./api.config";
export async function createWholeSaleCustomer(value) {
  return await axiosDefault.post(CreateWholeSaleUrl, value);
}

export async function createRetailCustomer(value) {
  return await axiosDefault.post(CreateCustomerUrl, {
    email: value.email_id,
    password: value.password,
    first_name: value.customer_name,
    address: value.address,
    mobile_number: value.contact_number,
    confirm_password: value.confirm_password,
    status: value.status,
    code: value.customer_code,
    description: value.description,
    country: value.country,
    state: value.state,
    city: value.city,
  });
}
