import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import { USER_STATUS, USER_TYPE } from "../../constants/generic";
import { CustomFormInput, CustomSelectFormInput } from "../common/FormInput";
import { CREATE_CUSTOMER_PROPERTY } from "../../constants/formikInitialData";
import {
  CREATE_CUSTOMER_VALIADATION,
  UPDATE_CUSTOMER_VALIDATION,
} from "../../constants/formikValidation";
import {
  createRetailCustomer,
  createWholeSaleCustomer,
} from "../../service/api.function";
import { toast } from "react-toastify";
import useGetCityQuery from "../../react-query/useGetCityQuery";
import useGetStateQuery from "../../react-query/useGetStateQuery";
import { useLocation, useNavigate } from "react-router-dom";
import axiosDefault from "../../service/api.config";
import { updateRetailUserUrl } from "../../service/api.url";

export default function UpdateCustomer(props) {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const StateQuery = useGetStateQuery(setState);
  const cityQuery = useGetCityQuery(setCity);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      contact_number: "",
      status: "",
      description: "",
      address: "",
      email_id: "",
      password: "",
      confirm_password: "",
      country: 101,
      state: "",
      city: "",
      id: "",
    },
    onSubmit: async (value) => {
      let response = await axiosDefault.post(updateRetailUserUrl, value, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status == 200) {
        toast.success(response.data?.message);
        navigate("/users/retail", { replace: true });
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validate: UPDATE_CUSTOMER_VALIDATION,
  });

  useEffect(() => {
    StateQuery.mutateAsync(formik.values.country);
  }, []);

  useEffect(() => {
    if (formik.values.state) cityQuery.mutateAsync(formik.values.state);
  }, [formik.values.state]);

  useEffect(() => {
    if (location?.state) {
      formik.setFieldValue("first_name", location.state?.first_name);
      formik.setFieldValue("last_name", location.state?.last_name);
      formik.setFieldValue("contact_number", location.state?.mobile_number);
      formik.setFieldValue("status", location.state?.status);
      formik.setFieldValue("description", location.state?.description);
      formik.setFieldValue("address", location.state?.address);
      formik.setFieldValue("email_id", location.state?.emailid);
      formik.setFieldValue("state", location.state?.state?.id);
      formik.setFieldValue("city", location.state?.city?.id);
      formik.setFieldValue("id", location.state?.id);
    }
  }, []);

  function InputFieldMapping(data, i) {
    switch (data.type) {
      case "select":
        return (
          <CustomSelectFormInput
            isRequired={true}
            error={data.error}
            name={data.name}
            labelName={data.labelName}
            onChange={formik.handleChange}
            value={data.value}
            children={data.option}
          />
        );
      default:
        return (
          <CustomFormInput
            value={data.value}
            isNumber={data?.isNumber}
            isVisible={data?.isVisible}
            onChange={formik.handleChange}
            name={data.name}
            error={data.error}
            labelName={data.labelName}
            type={data.type}
            isRequired={data.isRequired}
          />
        );
    }
  }

  function onHandleDiscard() {
    formik.resetForm();
  }

  function onHandleSubmitForm() {
    formik.submitForm();
  }

  return (
    <Fragment>
      <Breadcrumb title="Update Customer" parent="Digital" />
      <Container fluid={true}>
        <Row className="product-adding">
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Customer Details</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  {[
                    {
                      name: "first_name",
                      value: formik.values.first_name,
                      error: formik.errors.first_name,
                      labelName: "First Name",
                      type: "text",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "last_name",
                      value: formik.values.last_name,
                      error: formik.errors.last_name,
                      labelName: "Last Name",
                      type: "text",
                      isRequired: false,
                      isVisible: true,
                    },
                            //  {
                            //    name: "customer_code",
                            //    value: formik.values.customer_code,
                            //    error: formik.errors.customer_code,
                            //    labelName: "Customer Code",
                            //    type: "text",
                            //    isRequired: true,
                            //    isVisible: true,
                            //  },
                            //  {
                            //    name: "customer_type",
                            //    value: formik.values.customer_type,
                            //    error: formik.errors.customer_type,
                            //    labelName: "Customer Type",
                            //    type: "select",
                            //    isVisible: true,
                            //    option: [
                            //      ...USER_TYPE.map((value, i) => {
                            //        return (
                            //          <option value={value.id}>
                            //            {value.generic_name}
                            //          </option>
                            //        );
                            //      }),
                            //    ],
                            //    isRequired: true,
                            //  },
                    {
                      name: "description",
                      value: formik.values.description,
                      error: formik.errors.description,
                      labelName: "Description (optional)",
                      type: "textarea",
                      isVisible: true,
                    },
                    {
                      name: "address",
                      value: formik.values.address,
                      error: formik.errors.address,
                      labelName: "Address",
                      type: "text",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "contact_number",
                      value: formik.values.contact_number,
                      error: formik.errors.contact_number,
                      labelName: "Contact Number",
                      type: "text",
                      isRequired: true,
                      isNumber: true,
                      isVisible: true,
                    },
                    //          {
                    //            name: "gst_number",
                    //            value: formik.values.gst_number,
                    //            error: formik.errors.gst_number,
                    //            labelName: "GST Number",
                    //            type: "text",
                    //            isRequired: true,
                    //            isVisible: formik.values.customer_type != 1014,
                    //          },
                  ].map(InputFieldMapping)}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardBody>
                <div className="digital-add needs-validation">
                  {[
                    {
                      name: "email_id",
                      value: formik.values.email_id,
                      error: formik.errors.email_id,
                      labelName: "Email",
                      type: "text",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "password",
                      value: formik.values.password,
                      error: formik.errors.password,
                      labelName: "Password",
                      type: "password",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "confirm_password",
                      value: formik.values.confirm_password,
                      error: formik.errors.confirm_password,
                      labelName: "Confirm Password",
                      type: "password",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "status",
                      value: formik.values.status,
                      error: formik.errors.status,
                      labelName: "Status",
                      type: "select",
                      option: [
                        ...USER_STATUS.map((value, i) => {
                          return (
                            <option value={value.id}>
                              {value.generic_name}
                            </option>
                          );
                        }),
                      ],
                      isRequired: true,
                      isVisible: true,
                    },
                  ].map(InputFieldMapping)}

                  <FormGroup>
                    <Label className="col-form-label">Country</Label>
                    <select
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      name="country"
                      className="form-select"
                      disabled={true}
                    >
                      <option value="101">India</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">State</Label>
                    <select
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      name="state"
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {state.states?.map((value) => {
                        return <option value={value?.id}>{value.name}</option>;
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">City</Label>
                    <select
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      name="city"
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {city.cities?.map((value) => {
                        return <option value={value?.id}>{value.name}</option>;
                      })}
                    </select>
                  </FormGroup>

                  <FormGroup className="mb-0">
                    <div className="product-buttons text-center">
                      <Button
                        type="button"
                        onClick={onHandleSubmitForm}
                        color="primary"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={onHandleDiscard}
                        type="button"
                        color="light"
                      >
                        Discard
                      </Button>
                    </div>
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

// {
//            "id": 61,
//            "first_name": "Ram",
//            "last_name": "",
//            "emailid": "ram.zigainfotech@gmail.com",
//            "description": null,
//            "pincode": null,
//            "status": 1009,
//            "address": "no:19/14 1st street nethaji nagar",
//            "mobile_number": 9094730081,
//            "gender_id": null,
//            "city": {
//                "id": 131517,
//                "name": "Chennai",
//                "state_id": 4035,
//                "state_code": "TN",
//                "country_id": 101
//            },
//            "country": {
//                "id": 101,
//                "name": "India",
//                "currency": "INR",
//                "currency_name": "Indian rupee",
//                "currency_symbol": "₹"
//            },
//            "state": {
//                "id": 4035,
//                "name": "Tamil Nadu",
//                "country_id": 101,
//                "country_code": "IN"
//            }
//        }
