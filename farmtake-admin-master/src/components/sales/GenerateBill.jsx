import moment, { now } from "moment";
import React, { Fragment, useState } from "react";
import {
  Container,
  Card,
  Col,
  Row,
  CardBody,
  CardHeader,
  FormGroup,
  InputGroup,
  Input,
  Label,
  CardFooter,
  Button,
} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { FieldArray, useFormik, FormikProvider } from "formik";
import ReactSelect from "react-select";
import AddProductWholeSaleCustomer from "./common/AddProduct";
import useGetWholeCustomerQuery from "../../react-query/useGetWholeSaleQuery";
import { useEffect } from "react";
import axioDefault from "../../service/api.config";
import useGetAllProductQuery from "../../react-query/useGetAllProductQuery";
import { wholeSaleOrderUrl } from "../../service/api.url";
import { toast } from "react-toastify";

export default function BillGenerate(props) {
  let wholeSaleCustomerQuery = useGetWholeCustomerQuery(() => {});
  let productQuery = useGetAllProductQuery();
  const [isOutSideCustomer, setIsOutSideCustomer] = useState(false);

  const obj = {
    product_id: "",
    quantity: "",
    base_price: "",
    actual_price: "",
    gst: "",
    igst: "",
    cgst: "",
    sgst: "",
  };

  const formik = useFormik({
    initialValues: {
      order_date: moment(now()).format("YYYY-MM-DD HH:mm:ss"),
      customer_id: "",
      address: "",
      order_no: "",
      payment_status: "",
      mobile_number: "",
      remarks: "",
      product: [],
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    onSubmit: async (value) => {
      let response = await axioDefault.post(wholeSaleOrderUrl, value);
      if (response.status == 200) {
        formik.resetForm();
        toast.success("Ordered successfully");
      } else {
        toast.error(response.data?.message);
      }
    },
  });

  useEffect(() => {
    let response = wholeSaleCustomerQuery.data?.find(
      (value) => value.id == formik.values.customer_id
    );
    /**
     *
     */
    formik.setFieldValue("address", response?.address);
    formik.setFieldValue("mobile_number", response?.contact_number);
    /**
     *
     *
     */
    if (response) {
      // state tamil nadu id
      setIsOutSideCustomer(response?.state_id == 4035);
    }
  }, [formik.values.customer_id]);
  return (
    <Fragment>
      <Breadcrumb title="Generate Bill" parent="Digital" />
      <Container fluid={true}>
        <FormikProvider value={formik}>
          <Row className="product-adding">
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h5>Bill Generation Details</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <Label className="col-form-label">Order Date</Label>
                      <InputGroup>
                        <input
                          name="order_date"
                          type="datetime-local"
                          defaultValue={formik.values.order_date}
                          className="form-control"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Customer Name</Label>
                      <InputGroup>
                        <select
                          className="form-control"
                          name="customer_id"
                          onChange={formik.handleChange}
                          value={formik.values.customer_id}
                        >
                          <option value="">--Select--</option>
                          {wholeSaleCustomerQuery.data?.map((value, i) => {
                            return (
                              <option key={i} value={value.id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Address</Label>
                      <InputGroup>
                        <Input
                          name="address"
                          value={formik.values.address}
                          className="form-control"
                          onChange={formik.handleChange}
                          type="textarea"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Contact Number</Label>
                      <InputGroup>
                        <Input
                          name="mobile_number"
                          value={formik.values.mobile_number}
                          className="form-control"
                          onChange={formik.handleChange}
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">
                        Order No (Optional)
                      </Label>
                      <InputGroup>
                        <Input
                          name="order_no"
                          value={formik.values.order_no}
                          className="form-control"
                          onChange={formik.handleChange}
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Payment Status</Label>
                      <InputGroup>
                        <select
                          name="payment_status"
                          onChange={formik.handleChange}
                          className="form-control"
                          value={formik.values.payment_status}
                        >
                          <option value="">--select--</option>
                          <option value="1015">Paid</option>
                          <option value="1016">UnPaid</option>
                        </select>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">
                        Remarks (Optional)
                      </Label>
                      <InputGroup>
                        <Input
                          name="remarks"
                          value={formik.values.remarks}
                          className="form-control"
                          onChange={formik.handleChange}
                          type="textarea"
                        />
                      </InputGroup>
                    </FormGroup>

                    <Col xl="12">
                      <FieldArray
                        name="product"
                        render={(children) => {
                          return (
                            <>
                              <Button
                                color="primary"
                                onClick={() => {
                                  children.push(obj);
                                }}
                              >
                                Add product
                              </Button>
                              {formik.values.product.map((value, index) => {
                                return (
                                  <AddProductWholeSaleCustomer
                                    key={index}
                                    index={index}
                                    isOutSideCustomer={isOutSideCustomer}
                                    onDelete={() => children.remove(index)}
                                    formik={formik}
                                    product={productQuery.data}
                                  />
                                );
                              })}
                            </>
                          );
                        }}
                      />
                    </Col>
                  </div>
                </CardBody>
                <CardFooter
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button color="primary" onClick={() => formik.submitForm()}>
                    Submit
                  </Button>
                  <Button className="mx-2">Discard</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </FormikProvider>
      </Container>
    </Fragment>
  );
}
