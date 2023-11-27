export const CREATE_CUSTOMER_VALIADATION = (value) => {
  const error = {};
  console.log(value);
  if (!value.customer_name) {
    error["customer_name"] = "Required Customer Name";
  }

  // if (!value.customer_code) {
  //   error["customer_code"] = "Required Customer Code";
  // }
  if (!value.contact_number) {
    error["contact_number"] = "Required contactnumber";
  }
  if (!value.customer_type) {
    error["customer_type"] = "Required Customer Type";
  }
  if (!value.product) {
    error["product"] = "Required product";
  }
  if (!value.order_date) {
    error["order_date"] = "Required date";
  }
  if (!value.mobile_number) {
    error["mobile_number"] = "Required mobilenumber";
  }
  if (!value.customer_id) {
    error["customer_id"] = "Required customer id";
  }
  if (!value.order_no) {
    error["order_no"] = "Required ordernumber";
  }
  if (!value.payment_status) {
    error["payment_status"] = "Required PaymentStatus";
  }
  if (!value.remarks) {
    error["remarks"] = "Required remarks";
  }
  if (!value.status) {
    error["status"] = "Required Status";
  }
  if (!value.address) {
    error["address"] = "Required address";
  }
  if (!value.email_id) {
    error["email_id"] = "Required Email Id";
  }
  if (value.customer_type != 1014) {
    if (!value.gst_number) {
      error["gst_number"] = "Required GST Number";
    }
  }

  if (value.customer_type == 1014) {
    if (value.password !== value.confirm_password) {
      error["password"] = "Password did not match";
      error["confirm_password"] = "Password did not match";
    }
    if (!value.password) {
      error["password"] = "Required Password";
    }
    if (!value.confirm_password) {
      error["confirm_password"] = "Required Confirm Password";
    }
  }

  console.log(error,'----errror')
  return error;
};
export const UPDATE_CUSTOMER_VALIDATION = (value) => {
  const error = {};

  if (!value.first_name) {
    error["first_name"] = "Required First Name";
  }

  if (!value.last_name) {
    error["last_name"] = "Required Last Name";
  }

  if (!value.contact_number) {
    error["contact_number"] = "Required Contact Number";
  }

  if (!value.status) {
    error["status"] = "Required Status";
  }

  if (!value.address) {
    error["address"] = "Required address";
  }
  if (!value.email_id) {
    error["email_id"] = "Required Email Id";
  }
    if (value.password !== value.confirm_password) {
      error["password"] = "Password did not match";
      error["confirm_password"] = "Password did not match";
    }
    if (!value.password) {
      error["password"] = "Required Password";
    }
    if (!value.confirm_password) {
      error["confirm_password"] = "Required Confirm Password";
    }

  return error;
};
