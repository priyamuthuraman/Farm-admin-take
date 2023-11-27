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
import { CREATE_CUSTOMER_VALIADATION } from "../../constants/formikValidation";
import {
  createRetailCustomer,
  createWholeSaleCustomer,
} from "../../service/api.function";
import { toast } from "react-toastify";
import useGetCityQuery from "../../react-query/useGetCityQuery";
import useGetStateQuery from "../../react-query/useGetStateQuery";
import {useLocation} from "react-router-dom"

export default function CreateCustomer(props) {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const location=useLocation()
  const StateQuery = useGetStateQuery(setState);
  const cityQuery = useGetCityQuery(setCity);
  const formik = useFormik({
    initialValues: CREATE_CUSTOMER_PROPERTY,
    onSubmit: async (value) => {
      try {
        if (value.customer_type == 1014) {
          var response = await createRetailCustomer(value);
        } else {
          var response = await createWholeSaleCustomer(value);
        }
        if (response.status == 200) {
          toast.success("Created");
          formik.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validate: CREATE_CUSTOMER_VALIADATION,
  });

  useEffect(() => {
    StateQuery.mutateAsync(formik.values.country);
  }, []);

  useEffect(() => {
    if (formik.values.state) cityQuery.mutateAsync(formik.values.state);
  }, [formik.values.state]);
  
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
      <Breadcrumb title="Add Customer" parent="Digital" />
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
                      name: "customer_name",
                      value: formik.values.customer_name,
                      error: formik.errors.customer_name,
                      labelName: "Customer Name",
                      type: "text",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "customer_code",
                      value: formik.values.customer_code,
                      error: formik.errors.customer_code,
                      labelName: "Customer Code",
                      type: "text",
                      isRequired: true,
                      isVisible: true,
                    },
                    {
                      name: "customer_type",
                      value: formik.values.customer_type,
                      error: formik.errors.customer_type,
                      labelName: "Customer Type",
                      type: "select",
                      isVisible: true,
                      option: [
                        ...USER_TYPE.map((value, i) => {
                          return (
                            <option value={value.id}>
                              {value.generic_name}
                            </option>
                          );
                        }),
                      ],
                      isRequired: true,
                    },
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
                      type: "number",
                      isRequired: true,
                      isNumber: true,
                      isVisible: true,
                    },
                    {
                      name: "gst_number",
                      value: formik.values.gst_number,
                      error: formik.errors.gst_number,
                      labelName: "GST Number",
                      type: "text",
                      isRequired: true,
                      isVisible: formik.values.customer_type != 1014,
                    },
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
                      isVisible: formik.values.customer_type == 1014,
                    },
                    {
                      name: "confirm_password",
                      value: formik.values.confirm_password,
                      error: formik.errors.confirm_password,
                      labelName: "Confirm Password",
                      type: "password",
                      isRequired: true,
                      isVisible: formik.values.customer_type == 1014,
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
                        Save
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
