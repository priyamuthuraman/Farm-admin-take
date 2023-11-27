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
import axios from "axios"; // Import axios library
import { useLocation } from "react-router-dom";
import { GetAllUsers,getAllproductUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";

const CreateCustomer = (props) => {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [products, setProducts] = useState([]); // State to store products data
  const [users, setUsers] = useState([]); // State to store products data
  const location = useLocation();
  const StateQuery = useGetStateQuery(setState);
  const cityQuery = useGetCityQuery(setCity);
  const formik = useFormik({
    initialValues: CREATE_CUSTOMER_PROPERTY,
    onSubmit: async (value) => {
      try {
        if (value.customer_type === 1014) {
          var response = await createRetailCustomer(value);
        } else {
          var response = await createWholeSaleCustomer(value);
        }
        if (response.status === 200) {
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

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        let response = await axiosDefault.get(getAllproductUrl);
        // console.log(response);
        setProducts(response.data.message);
         // Set the products state with the fetched data
         console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run the effect only once on mount
  useEffect(() => {
    // Fetch products when the component mounts
    const UserDetails = async () => {
      try {
        let response = await axiosDefault.get(GetAllUsers);
        // console.log(response);
        setUsers(response.data.message); // Set the products state with the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    UserDetails();
  }, []); // Empty dependency array to run the effect only once on mount

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
            children={data.option || products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
            key={i}
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
            key={i}
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
      <Breadcrumb title="Create Custom Order" parent="Digital" />
      <Container fluid={true}>
        <Row className="product-adding">
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Order Create</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                   {[
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
                      name: "mobile_number",
                      value: formik.values.mobile_number,
                      error: formik.errors.mobile_number,
                      labelName: "Mobile Number",
                      type: "number",
                      isRequired: true,
                      isNumber: true,
                      isVisible: true,
                    },
                    
                    {
                      name: "order_date",
                      value: formik.values.order_date,
                      error: formik.errors.order_date,
                      labelName: "Order Date",
                      type: "date",
                      isRequired: true,
                      isVisible: true,
                    },
                   
                    {
                      name: "product",
                      value: formik.values.product,
                      error: formik.errors.product,
                      labelName: "Product",
                      type: "select",
                      isRequired: true,
                      isVisible: true,
                      option: products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      )),
                    },
                    // Add more fields as needed
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
                        name: "customer_id",
                        value: formik.values.customer_id,
                        error: formik.errors.customer_id,
                        labelName: "Customer ID",
                        type: "select",
                        isRequired: true,
                        isVisible: true,
                        option: users.map((user) => (
                            <option key={user.id} value={user.id}>
                              ({user.mobile_number}) {user.first_name}  {user.last_name}
                            </option>
                        )),
                      },
                      {
                        name: "order_no",
                        value: formik.values.order_no,
                        error: formik.errors.order_no,
                        labelName: "Order Number",
                        type: "text",
                        isRequired: true,
                        isVisible: true,
                      },
                      {
                        name: "payment_status",
                        value: formik.values.payment_status,
                        error: formik.errors.payment_status,
                        labelName: "Payment Status",
                        type: "select", // Change the type to "select"
                        isVisible: true,
                        option: [
                          { id: 1015, name: "Paid" },
                          { id: 1016, name: "Unpaid" },
                        ].map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.id}
                          </option>
                        )),
                      },
                      {
                        name: "remarks",
                        value: formik.values.remarks,
                        error: formik.errors.remarks,
                        labelName: "Remarks",
                        type: "textarea",
                        isVisible: true,
                      },
                     
                      // Add more fields as needed
                    ].map(InputFieldMapping)}
  
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
          {/* ... (rest of the component) */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateCustomer;
